import type { APIRoute } from 'astro';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

export const GET: APIRoute = async () => {
  try {
    const score = await redis.get<number>('chimera_global_clicks') || 0;
    console.log("Global score fetched:", score);
    return new Response(JSON.stringify({ score }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Redis GET error:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch score', score: 0 }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Rate Limiting Logic: Max 10 requests per 5 seconds per IP
    if (ip !== 'unknown') {
      const rlKey = `rate_limit:clicker:${ip}`;
      const requests = await redis.incr(rlKey);
      if (requests === 1) {
        await redis.expire(rlKey, 5);
      }
      if (requests > 10) {
        return new Response(JSON.stringify({ error: 'Too many requests', retryAfter: 5 }), { 
          status: 429,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    let increment = 1;
    
    try {
      const body = await request.json();
      if (body.clicks && typeof body.clicks === 'number') {
        increment = body.clicks;
      }
    } catch (e) {
      // Ignore if parsing fails
    }

    // Basic protection against abuse
    if (increment > 100) increment = 100;
    if (increment < 1) increment = 1;

    const score = await redis.incrby('chimera_global_clicks', increment);
    
    return new Response(JSON.stringify({ score }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update score' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
