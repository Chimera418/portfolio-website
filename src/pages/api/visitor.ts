import type { APIRoute } from 'astro';

// In-memory cache to store the image buffer per IP.
// This persists while the serverless function is warm, protecting against rapid refreshes.
const ipCache = new Map<string, { buffer: ArrayBuffer, contentType: string, timestamp: number }>();

export const GET: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Get the client's IP address (works locally and on Vercel)
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || clientAddress || 'unknown';
    
    // Extract IPv4 address from potentially complex IP strings
    let ip = rawIp.split(',')[0].trim();
    if (ip.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    } else if (ip === '::1') {
      ip = '127.0.0.1';
    }
    
    const now = Date.now();
    const urlParams = new URL(request.url).searchParams;
    const force = urlParams.get('force') === 'true';
    
    // Cache per IP for 1 hour (3600000 ms) in memory, unless forced
    if (ipCache.has(ip) && !force) {
      const cached = ipCache.get(ip)!;
      if (now - cached.timestamp < 3600000) {
        return new Response(cached.buffer, {
          status: 200,
          headers: {
            'Content-Type': cached.contentType,
            'Cache-Control': 'private, max-age=3600' // Tell the user's browser to cache it
          }
        });
      }
    }

    const url = 'https://count.getloli.com/@chimera-realm-visitors?name=chimera-realm-visitors&theme=rule34&padding=4&offset=0&align=top&scale=0.7&pixelated=1&darkmode=0';
    
    // Forward standard browser headers to help avoid being blocked by Cloudflare or WAF
    const response = await fetch(url, {
      headers: {
        'User-Agent': request.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': request.headers.get('referer') || 'http://localhost:3000/',
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch Moe Counter:', response.status);
      return new Response('Failed to fetch', { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/svg+xml';
    const arrayBuffer = await response.arrayBuffer();
    
    // Save the image buffer to our local per-IP memory cache
    ipCache.set(ip, { buffer: arrayBuffer, contentType, timestamp: now });
    
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // private: Only cache in the browser, not on Vercel's Edge network
        'Cache-Control': 'private, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Error fetching visitor count:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
