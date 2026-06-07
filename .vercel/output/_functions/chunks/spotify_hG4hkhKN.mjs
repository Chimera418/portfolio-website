const prerender = false;
const GET = async () => {
  try {
    const client_id = "98de384e3d384db38ce210a773573e97";
    const client_secret = "90801028dd4b4f0c8655dec5872b47c2";
    const refresh_token = "AQAyljJet1X8XQV3ZmjJYgmgPl3OErYWh_dMmmdI7uRRFvLkFVJsG93ZbPTmutgesjTzm80Np6GZkEDrldMQDid2groSA4Rvy7JxbXsnOLjQTTHi3mRCL7LXDlavAaq1ExQ";
    if (!client_id || !client_secret || !refresh_token) ;
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token
      })
    });
    if (!tokenResponse.ok) {
      throw new Error("Failed to get access token");
    }
    const { access_token } = await tokenResponse.json();
    let trackResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { "Authorization": `Bearer ${access_token}` }
    });
    let track = null;
    if (trackResponse.status === 200) {
      const data = await trackResponse.json();
      if (data.item) {
        track = {
          name: data.item.name,
          artist: data.item.artists.map((a) => a.name).join(", "),
          album: data.item.album.name,
          image: data.item.album.images[0]?.url,
          url: data.item.external_urls.spotify,
          duration_ms: data.item.duration_ms,
          progress_ms: data.progress_ms,
          is_playing: data.is_playing
        };
      }
    }
    if (!track) {
      const recentResponse = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
        headers: { "Authorization": `Bearer ${access_token}` }
      });
      if (recentResponse.ok) {
        const recentData = await recentResponse.json();
        if (recentData.items?.[0]) {
          const item = recentData.items[0].track;
          track = {
            name: item.name,
            artist: item.artists.map((a) => a.name).join(", "),
            album: item.album.name,
            image: item.album.images[0]?.url,
            url: item.external_urls.spotify,
            duration_ms: item.duration_ms,
            progress_ms: 0,
            is_playing: false
          };
        }
      }
    }
    return new Response(JSON.stringify({ track }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Spotify API error:", error);
    return new Response(JSON.stringify({ track: null, error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
