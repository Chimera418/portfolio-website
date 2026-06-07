# 🎵 Spotify API Integration Guide

This project includes a live, real-time "Now Playing" Spotify card that fetches your currently playing track (or recently played track if nothing is playing) directly from the Spotify API.

## Architecture

The integration works in two parts:
1. **Serverless Endpoint (`src/pages/api/spotify.ts`)** — An Astro server API route that securely communicates with Spotify using your secret tokens. It handles token refreshing automatically.
2. **Frontend Component (`src/components/SpotifyCard.astro`)** — A UI component that polls the local endpoint every 30 seconds and displays album art, track name, and artist with an animated equalizer.

---

## 🔐 Environment Variables

The project requires 3 environment variables. **Never commit your `.env` file to GitHub** (it is already in `.gitignore`).

Create a `.env` file in the root of your project:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

---

## 🛠️ How to Generate Your Tokens (First-Time Setup)

### Step 1: Create a Spotify App
1. Log into the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) with your Spotify account.
2. Click **Create app**.
3. Fill in the App name (e.g., "Portfolio") and a short description.
4. For the **Redirect URI**, enter exactly: `https://google.com`
5. Check the **Web API** box, agree to the terms, and click **Save**.
6. Go to your app's **Settings** and copy the **Client ID** and **Client Secret**.
7. Add them to your `.env` file.

### Step 2: Get the Authorization Code
Paste the following URL into your browser, replacing `YOUR_CLIENT_ID` with your actual Client ID:

```text
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://google.com&scope=user-read-currently-playing,user-read-recently-played
```

- Click **Agree** to authorize.
- You'll be redirected to Google. Look at the browser's address bar — it will look like:
  `https://google.com/?code=AQA...some_long_code...`
- Copy the **entire code value** (everything after `?code=`).

> ⚠️ **Important:** Authorization codes expire after ~10 minutes and can only be used once. Run the script immediately after copying the code.

### Step 3: Run the Token Generator Script
A helper script is included at `scripts/get-token.cjs`. It reads your credentials from `.env` and accepts the authorization code as a CLI argument.

```bash
node scripts/get-token.cjs YOUR_CODE_FROM_URL
```

**Example:**
```bash
node scripts/get-token.cjs AQDFWx2EIsNH...
```

The script will print your `refresh_token` to the terminal. Copy it and add it to your `.env` file:

```env
SPOTIFY_REFRESH_TOKEN=AQAy...your_token...
```

Then **restart your dev server** so Astro loads the new `.env`:
```bash
# Stop the server (Ctrl+C), then:
npm run dev
```

---

## 🔄 Switching Spotify Accounts

If you want to link a different Spotify account:
1. Create a new app (or reuse the existing one) on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) logged into the **new account**.
2. Update `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in `.env` with the new app's credentials.
3. Follow **Steps 2 and 3** above to generate a fresh authorization code and refresh token for the new account.
4. Update `SPOTIFY_REFRESH_TOKEN` in `.env` and restart the dev server.

---

## 🚀 Deployment (Production)

When you deploy to **Vercel** or **Netlify**:
1. Go to your project settings in the hosting dashboard.
2. Find the **Environment Variables** section.
3. Add all 3 variables: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN`.
4. Redeploy — the serverless function will securely access these values in production.
