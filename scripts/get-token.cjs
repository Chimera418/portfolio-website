// ============================================================
// Spotify Refresh Token Generator
// ============================================================
// Usage:
//   node scripts/get-token.cjs <authorization_code>
//
// This script reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET
// from your .env file. It does NOT modify your .env file.
//
// To get an authorization code, follow the steps in:
//   spotify_api_guide.md
// ============================================================

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  // 1. Read credentials from .env (never hardcoded!)
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    console.error('❌ Error: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in your .env file.');
    process.exit(1);
  }

  // 2. Read authorization code from command-line argument
  const code = process.argv[2];

  if (!code) {
    console.error('❌ Error: No authorization code provided.');
    console.error('');
    console.error('Usage: node scripts/get-token.cjs <authorization_code>');
    console.error('');
    console.error('Get your code by visiting this URL in your browser:');
    console.error(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://google.com&scope=user-read-currently-playing,user-read-recently-played`);
    process.exit(1);
  }

  console.log('🎵 Fetching refresh token from Spotify...');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://google.com',
    }),
  });

  const data = await response.json();

  if (data.refresh_token) {
    console.log('');
    console.log('✅ Success! Here is your refresh token:');
    console.log('');
    console.log(data.refresh_token);
    console.log('');
    console.log('👉 Copy the token above and update SPOTIFY_REFRESH_TOKEN in your .env file.');
  } else {
    console.error('❌ Error from Spotify API:');
    console.error(JSON.stringify(data, null, 2));
    if (data.error === 'invalid_grant') {
      console.error('');
      console.error('💡 Tip: Authorization codes expire after ~10 minutes and can only be used once.');
      console.error('   Generate a fresh code by visiting the authorization URL again.');
    }
  }
}

run();
