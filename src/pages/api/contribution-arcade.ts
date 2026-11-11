import type { APIRoute } from 'astro';

export const prerender = false;

const ARCADE_SVG_URL = 'https://raw.githubusercontent.com/Chimera418/Chimera418/main/assets/contribution-game.svg';
const SNAKE_SVG_URL = 'https://raw.githubusercontent.com/Chimera418/Chimera418/gh-pages/github-contribution-grid-snake-dark.svg';

export const GET: APIRoute = async (ctx) => {
  try {
    const url = ctx?.url || (ctx?.request ? new URL(ctx.request.url) : new URL('http://localhost/api/contribution-history'));
    const wantsSnake = url.searchParams.get('game') === 'snake';

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
      replaceVar('cs', '#cba6f7');                   // Snake body (Catppuccin Mauve - bright vibrant purple)
      replaceVar('ce', '#181825');                   // Empty cell background (Catppuccin surface-dim)
      replaceVar('c0', '#181825');                   // 0 commits level
      replaceVar('c1', '#1e4a30');                   // Level 1 commits
      replaceVar('c2', '#2e6e44');                   // Level 2 commits
      replaceVar('c3', '#489d5f');                   // Level 3 commits
      replaceVar('c4', '#a6e3a1');                   // Level 4 commits (vibrant Catppuccin green)

      // Add high-contrast glowing snake and visible day cell borders
      const snakeCustomCss = `
        .s { fill: #cba6f7 !important; stroke: #f5e0dc !important; stroke-width: 0.75px !important; filter: drop-shadow(0 0 5px rgba(203, 166, 247, 0.8)); }
        .s.s0 { fill: #f5c2e7 !important; stroke: #ffffff !important; stroke-width: 1px !important; filter: drop-shadow(0 0 8px rgba(245, 194, 231, 0.95)); }
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

      // Theme empty cells to Catppuccin surface-container (#181825) instead of raw gray
      svg = svg.replace(/fill="#ebedf0"/g, 'fill="#181825"');

      // Theme contribution squares to vibrant Catppuccin green/teal hues
      svg = svg.replace(/fill="#40c463"/g, 'fill="#a6e3a1"');
      svg = svg.replace(/fill="#9be9a8"/g, 'fill="#89dceb"');
      svg = svg.replace(/fill="#30a14e"/g, 'fill="#94e2d5"');
      svg = svg.replace(/fill="#216e39"/g, 'fill="#74c7ec"');

      // Append styles for light borders around day cells and crisp font rendering
      const arcadeCustomCss = `
        image { image-rendering: pixelated; image-rendering: -moz-crisp-edges; }
        text { fill: #cdd6f4 !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-weight: 600; }
        rect[id^="c-"] { stroke: rgba(255, 255, 255, 0.18) !important; stroke-width: 1px !important; }
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
        'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    console.error('Error fetching contribution SVG from GitHub:', err);
    return Response.redirect(ARCADE_SVG_URL, 302);
  }
};
