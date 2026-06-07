import fs from 'fs';
import path from 'path';

async function fetchImage(repoUrl, outputPath) {
  try {
    const res = await fetch(`https://lpf64gdwdb.execute-api.us-east-1.amazonaws.com/?repo=${repoUrl}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/json',
        'Origin': 'https://www.bannerbear.com',
        'Referer': 'https://www.bannerbear.com/'
      }
    });
    const data = await res.json();
    if (data && data.length >= 4) {
      const imageUrl = data[3];
      const imageRes = await fetch(imageUrl);
      const buffer = await imageRes.arrayBuffer();
      fs.writeFileSync(outputPath, Buffer.from(buffer));
      console.log(`Saved ${outputPath}`);
    } else {
      console.log(`No image for ${repoUrl}`);
    }
  } catch (err) {
    console.error(`Error fetching ${repoUrl}:`, err);
  }
}

async function run() {
  const dir = './src/content/projects';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const githubMatch = content.match(/github:\s*"(https:\/\/github\.com\/[^"]+)"/);
    if (githubMatch) {
      const slug = file.replace('.md', '');
      const outPath = `./public/images/projects/${slug}.jpg`;
      console.log(`Fetching ${githubMatch[1]}...`);
      await fetchImage(githubMatch[1], outPath);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

run();
