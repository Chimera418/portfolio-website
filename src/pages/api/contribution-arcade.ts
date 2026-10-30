import type { APIRoute } from 'astro';

export const prerender = false;

const GITHUB_SVG_URL = 'https://raw.githubusercontent.com/Chimera418/Chimera418/main/assets/contribution-game.svg';

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(GITHUB_SVG_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/svg+xml,image/*,*/*'
      }
    });

    if (!response.ok) {
      throw new Error(`Upstream GitHub responded with ${response.status}`);
    }

    let svg = await response.text();

    // Ensure viewBox is set on the root <svg> tag so the commit graph scales responsively
    // across all bento card sizes and screen resolutions, leaving margin on the left for day labels
    svg = svg.replace(/<svg(\s+[^>]*)>/, (match, attrs) => {
      const cleanedAttrs = attrs.replace(/\s*viewBox=["'][^"']*["']/g, '');
      return `<svg${cleanedAttrs} viewBox="-36 0 1202 169">`;
    });

    // Strip the hardcoded white background rect so the card background shows through
    // Matches: <rect width="100%" height="100%" fill="#ffffff"/> (with any quote style / whitespace)
    svg = svg.replace(/<rect[^>]*fill=["']#(?:fff(?:fff)?|ffffff)["'][^>]*\/>/gi, '');
    svg = svg.replace(/<rect[^>]*fill=["']white["'][^>]*\/>/gi, '');

    // Make month timeline text light and legible against the dark card surface
    svg = svg.replace(/fill="#57606a"/g, 'fill="#cdd6f4" font-weight="600"');

    // Prepend visible day-of-week labels ("Mon", "Wed", "Fri") on the left of the timeline
    const dayLabels = '<g id="day-labels"><text x="-8" y="49" text-anchor="end" font-size="10" fill="#cdd6f4" font-weight="600">Mon</text><text x="-8" y="93" text-anchor="end" font-size="10" fill="#cdd6f4" font-weight="600">Wed</text><text x="-8" y="137" text-anchor="end" font-size="10" fill="#cdd6f4" font-weight="600">Fri</text></g>';
    svg = svg.replace('</defs>', '</defs>' + dayLabels);

    // Inject styles for light borders around day cells and crisp font rendering
    const customCss = 'image { image-rendering: pixelated; image-rendering: -moz-crisp-edges; } text { fill: #cdd6f4 !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; font-weight: 600; } rect[id^="c-"] { stroke: rgba(255, 255, 255, 0.25); stroke-width: 1px; }';
    svg = svg.replace(/<style>.*?<\/style>/, `<style>${customCss}</style>`);

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    console.error('Error fetching contribution-game SVG from GitHub:', err);
    // If upstream fetch fails or encounters an error, redirect directly to raw GitHub URL
    return Response.redirect(GITHUB_SVG_URL, 302);
  }
};

