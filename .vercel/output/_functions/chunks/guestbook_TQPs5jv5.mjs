import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || "https://ubkcjinuuhfyypsnzfmt.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVia2NqaW51dWhmeXlwc256Zm10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMjMxNjgsImV4cCI6MjA5NTU5OTE2OH0.EMt0uVcNsJCkBVNsFrja7kULRSMbA3i2F9PmRvPtbq4";
const supabase = createClient(supabaseUrl, supabaseAnonKey) ;

const GET = async () => {
  try {
    const { data, error } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false }).limit(100);
    if (error) {
      console.error("Supabase GET error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=10, s-maxage=60, stale-while-revalidate=120"
      }
    });
  } catch (error) {
    console.error("Server GET error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, handle, website, message, avatarIdx } = body;
    if (!name || !message) {
      return new Response(JSON.stringify({ error: "Name and message are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data, error } = await supabase.from("guestbook").insert([
      {
        name,
        handle: handle || null,
        website: website || null,
        message,
        avatarIdx: parseInt(avatarIdx) || 0
      }
    ]).select().single();
    if (error) {
      console.error("Supabase error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
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
