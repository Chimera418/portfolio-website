import type { APIRoute } from 'astro';

export const prerender = false;

const ARCADE_SVG_URL = 'https://raw.githubusercontent.com/Chimera418/Chimera418/main/assets/contribution-game.svg';
const SNAKE_SVG_URL = 'https://raw.githubusercontent.com/Chimera418/Chimera418/gh-pages/github-contribution-grid-snake-dark.svg';

const CATPPUCCIN_ACCENTS: Record<string, string> = {
  rosewater: '#f5e0dc',
  flamingo: '#f2cdcd',
  pink: '#f5c2e7',
  mauve: '#cba6f7',
  red: '#f38ba8',
  maroon: '#eba0ac',
  peach: '#fab387',
  yellow: '#f9e2af',
  green: '#a6e3a1',
  teal: '#94e2d5',
  sky: '#89dceb',
  sapphire: '#74c7ec',
  blue: '#89b4fa',
  lavender: '#b4befe',
};

function blendHex(hex1: string, hex2: string, ratio: number): string {
  const parse = (h: string) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
  };
  const [r1, g1, b1] = parse(hex1);
  const [r2, g2, b2] = parse(hex2);
  const r = Math.round(r1 * ratio + r2 * (1 - ratio));
  const g = Math.round(g1 * ratio + g2 * (1 - ratio));
  const b = Math.round(b1 * ratio + b2 * (1 - ratio));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

export const GET: APIRoute = async (ctx) => {
  try {
    const url = ctx?.url || (ctx?.request ? new URL(ctx.request.url) : new URL('http://localhost/api/contribution-history'));
    const wantsSnake = url.searchParams.get('game') === 'snake';
    const accentParam = (url.searchParams.get('accent') || url.searchParams.get('color') || 'mauve').toLowerCase().trim();

    // Resolve target accent color to hex
    let accentHex = CATPPUCCIN_ACCENTS[accentParam];
    if (!accentHex) {
      if (accentParam.startsWith('#') && (accentParam.length === 7 || accentParam.length === 4)) {
        accentHex = accentParam;
      } else if (/^[0-9a-f]{6}$/i.test(accentParam)) {
        accentHex = `#${accentParam}`;
      } else {
        accentHex = '#cba6f7'; // Default to Mauve
      }
    }

    // Generate 4-step density gradient from empty surface-dim (#181825) to vibrant accent
    const bg = '#181825';
    const lvl1 = blendHex(accentHex, bg, 0.38);
    const lvl2 = blendHex(accentHex, bg, 0.60);
    const lvl3 = blendHex(accentHex, bg, 0.82);
    const lvl4 = accentHex;

    // Default to the rotating GitHub contribution game (Pac-Man, Bomberman, Snake, etc.)
    let targetUrl = wantsSnake ? SNAKE_SVG_URL : ARCADE_SVG_URL;

    // Cache-bust upstream fetch with a 5-minute bucket so new commits from GitHub Actions are picked up live
    const cacheBuster = Math.floor(Date.now() / (1000 * 300));
    const fetchUrl = `${targetUrl}?v=${cacheBuster}`;

    let response = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/svg+xml,image/*,*/*'
      }
    });

    // Fallback if arcade SVG fails, try snake
    if (!response.ok && targetUrl === ARCADE_SVG_URL) {
      targetUrl = SNAKE_SVG_URL;
      response = await fetch(`${targetUrl}?v=${cacheBuster}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/svg+xml,image/*,*/*'
        }
      });
    }

    if (!response.ok) {
      throw new Error(`Upstream GitHub responded with ${response.status}`);
    }

    let svg = await response.text();

    const isSnake = svg.includes('Platane/snk') || svg.includes('class="s s0"') || svg.includes('--cs:');

    if (isSnake) {
      // ── Snake Game (Platane/snk) Theming ──────────────────────────────────
      const replaceVar = (name: string, val: string) => {
        const reg = new RegExp(`(--${name}:\\s*)[^;}]+`, 'g');
        svg = svg.replace(reg, `$1${val}`);
      };

      replaceVar('cb', 'rgba(255, 255, 255, 0.18)'); // Day cell border (light and visible)
      replaceVar('cs', accentHex);                   // Snake body (user-chosen accent)
      replaceVar('ce', '#181825');                   // Empty cell background (Catppuccin surface-dim)
      replaceVar('c0', '#181825');                   // 0 commits level
      replaceVar('c1', lvl1);                        // Level 1 commits
      replaceVar('c2', lvl2);                        // Level 2 commits
      replaceVar('c3', lvl3);                        // Level 3 commits
      replaceVar('c4', lvl4);                        // Level 4 commits (vibrant accent)

      // Add high-contrast glowing snake and visible day cell borders
      const snakeCustomCss = `
        .s { fill: ${accentHex} !important; stroke: #f5e0dc !important; stroke-width: 0.75px !important; filter: drop-shadow(0 0 5px rgba(203, 166, 247, 0.8)); }
        .s.s0 { fill: ${lvl3} !important; stroke: #ffffff !important; stroke-width: 1px !important; filter: drop-shadow(0 0 8px rgba(245, 194, 231, 0.95)); }
        .c { stroke: rgba(255, 255, 255, 0.16) !important; stroke-width: 1px !important; rx: 3px !important; ry: 3px !important; }
      `;

      if (svg.includes('</style>')) {
        svg = svg.replace('</style>', `${snakeCustomCss}</style>`);
      } else {
        svg = svg.replace('<svg', `<svg><style>${snakeCustomCss}</style>`);
      }

      // Strip any full white background rects
      svg = svg.replace(/<rect[^>]*fill=["']#(?:fff(?:fff)?|ffffff)["'][^>]*\/>/gi, '');
      svg = svg.replace(/<rect[^>]*fill=["']white["'][^>]*\/>/gi, '');
    } else {
      // ── Arcade Games (Pac-Man, Bomberman, Breakout, etc.) ─────────────────
      // Detect SVG height dynamically so neither Pac-Man (184), Bomberman (169), nor others clip
      const heightMatch = svg.match(/height=["'](\d+)["']/);
      const svgHeight = heightMatch ? Number(heightMatch[1]) : 184;

      // Add viewBox if missing to ensure fluid, sharp responsive scaling
      if (!svg.includes('viewBox=')) {
        svg = svg.replace('<svg', `<svg viewBox="0 0 1166 ${svgHeight}"`);
      }

      // Strip hardcoded white background rect
      svg = svg.replace(/<rect[^>]*fill=["']#(?:fff(?:fff)?|ffffff)["'][^>]*\/>/gi, '');
      svg = svg.replace(/<rect[^>]*fill=["']white["'][^>]*\/>/gi, '');

      // Make month timeline text high-contrast Catppuccin text (#cdd6f4)
      svg = svg.replace(/fill="#57606a"/g, 'fill="#cdd6f4" font-weight="600"');

      // Theme empty cells to Catppuccin surface-container (#181825) across static fill & animate values
      svg = svg.replace(/#ebedf0/gi, '#181825');

      // Make maze walls (fill="#000000") clearly visible against dark background
      // #7f849c = Catppuccin overlay1 — crisp slate wall, perfectly readable arcade maze boundary
      svg = svg.replace(/fill="#000000"/gi, 'fill="#7f849c"');

      // Theme contribution squares to the dynamic secondary accent color
      // Level 1 (least active, 1-9 commits): subtle tint of accent
      svg = svg.replace(/#9be9a8/gi, lvl1);
      // Level 2 (10-19 commits): medium tint of accent
      svg = svg.replace(/#40c463/gi, lvl2);
      // Level 3 (20-29 commits): bright tint of accent
      svg = svg.replace(/#30a14e/gi, lvl3);
      // Level 4 (30+ commits): full vibrant secondary accent
      svg = svg.replace(/#216e39/gi, lvl4);

      // Inject stroke attributes directly onto each day-cell rect (works in <img> context unlike CSS)
      // This adds visible borders between squares without relying on injected <style>
      svg = svg.replace(
        /<rect id="c-([^"]+)"/g,
        '<rect stroke="rgba(205,214,244,0.18)" stroke-width="1" id="c-$1"'
      );

      // Make other text colors visible (replace fill attributes directly on text elements)
      svg = svg.replace(/(<text[^>]*?)fill="#24292e"/g, '$1fill="#cdd6f4"');

      // Inject style only for image-rendering (works in some contexts)
      const arcadeCustomCss = `
        image { image-rendering: pixelated; image-rendering: -moz-crisp-edges; }
        text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-weight: 600; }
      `;

      if (svg.includes('</style>')) {
        svg = svg.replace('</style>', `${arcadeCustomCss}</style>`);
      } else {
        svg = svg.replace(/<svg(\s+[^>]*)>/, `<svg$1><style>${arcadeCustomCss}</style>`);
      }
    }

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    console.error('Error fetching contribution SVG from GitHub:', err);
    return Response.redirect(ARCADE_SVG_URL, 302);
  }
};
