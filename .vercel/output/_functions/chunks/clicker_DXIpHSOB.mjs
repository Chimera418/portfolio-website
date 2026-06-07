import { Redis } from '@upstash/redis';

let redis = null;
try {
  if ("gQAAAAAAAYTtAAIgcDE2YjJlNzRkZmIzZmU0MDMxOTcwYmVhZjQ0MWY3OGQxNg") {
    redis = new Redis({
      url: "https://literate-eel-99565.upstash.io",
      token: "gQAAAAAAAYTtAAIgcDE2YjJlNzRkZmIzZmU0MDMxOTcwYmVhZjQ0MWY3OGQxNg"
    });
  }
} catch (e) {
  console.warn("⚠️ Failed to initialize Redis:", e);
}
const GET = async () => {
  try {
    if (!redis) throw new Error("Redis is not configured");
    const score = await redis.get("chimera_global_clicks") || 0;
    console.log("Global score fetched:", score);
    return new Response(JSON.stringify({ score }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Redis GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch score", score: 0 }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    if (!redis) throw new Error("Redis is not configured");
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (ip !== "unknown") {
      const rlKey = `rate_limit:clicker:${ip}`;
      const requests = await redis.incr(rlKey);
      if (requests === 1) {
        await redis.expire(rlKey, 5);
      }
      if (requests > 10) {
        return new Response(JSON.stringify({ error: "Too many requests", retryAfter: 5 }), {
          status: 429,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    let increment = 1;
    try {
      const body = await request.json();
      if (body.clicks && typeof body.clicks === "number") {
        increment = body.clicks;
      }
    } catch (e) {
    }
    if (increment > 100) increment = 100;
    if (increment < 1) increment = 1;
    const score = await redis.incrby("chimera_global_clicks", increment);
    return new Response(JSON.stringify({ score }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update score" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
