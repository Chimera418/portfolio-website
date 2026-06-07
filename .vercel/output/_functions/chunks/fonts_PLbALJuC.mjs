const GET = async () => {
  try {
    const response = await fetch("https://asciified.thelicato.io/api/v2/fonts");
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Upstream API error" }), { status: response.status });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error("Fonts API Proxy Error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch fonts" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
