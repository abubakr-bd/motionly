import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconWavePath = path.resolve('public/icon_wave.png');
const iconWaveBase64 = fs.readFileSync(iconWavePath).toString('base64');

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#040711" />
      <stop offset="50%" stop-color="#091024" />
      <stop offset="100%" stop-color="#03050d" />
    </linearGradient>

    <!-- Radial Ambient Glows -->
    <radialGradient id="blue-glow" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#0284c7" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#040711" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="cyan-glow" cx="20%" cy="20%" r="40%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#040711" stop-opacity="0" />
    </radialGradient>

    <!-- Card Border Gradient -->
    <linearGradient id="card-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.6" />
      <stop offset="40%" stop-color="#2563eb" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#1e40af" stop-opacity="0.5" />
    </linearGradient>

    <!-- Pill Gradient -->
    <linearGradient id="pill-bg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1e3a8a" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.7" />
    </linearGradient>

    <!-- Drop Glow Filter -->
    <filter id="drop-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Base Dark Background -->
  <rect width="1200" height="630" fill="url(#bg-grad)" />

  <!-- Ambient Glows -->
  <circle cx="600" cy="315" r="480" fill="url(#blue-glow)" />
  <circle cx="200" cy="150" r="320" fill="url(#cyan-glow)" />

  <!-- Subtle Geometric Grid Lines -->
  <g stroke="#ffffff" stroke-opacity="0.035" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="525" x2="1200" y2="525" />
    
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Central Glassmorphic Card Container (Fits perfectly inside 600x600 safe zone) -->
  <rect x="250" y="45" width="700" height="540" rx="32" fill="#0b1220" fill-opacity="0.8" stroke="url(#card-border)" stroke-width="2" />

  <!-- Content Elements -->
  <!-- 1. Top Badge -->
  <g transform="translate(600, 105)">
    <rect x="-170" y="-18" width="340" height="36" rx="18" fill="url(#pill-bg)" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="1" />
    <circle cx="-142" cy="0" r="4.5" fill="#38bdf8" />
    <text x="-126" y="5" font-family="'Outfit', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="700" fill="#38bdf8" letter-spacing="2.5">PREMIUM VIDEO MARKETING AGENCY</text>
  </g>

  <!-- 2. Motionly Wave Icon -->
  <image href="data:image/png;base64,${iconWaveBase64}" x="470" y="152" width="260" height="150" filter="url(#drop-glow)" />

  <!-- 3. Title: MOTIONLY MEDIA -->
  <text x="600" y="358" text-anchor="middle" font-family="'Outfit', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="48" font-weight="800" fill="#ffffff" letter-spacing="4">MOTIONLY MEDIA</text>

  <!-- 4. Subtitle -->
  <text x="600" y="415" text-anchor="middle" font-family="'Outfit', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="18" font-weight="500" fill="#94a3b8" letter-spacing="1">Elite Video Systems &amp; High-Retention Content Engine</text>

  <!-- 5. Bottom Domain Pill -->
  <g transform="translate(600, 492)">
    <rect x="-115" y="-18" width="230" height="36" rx="18" fill="#1e293b" fill-opacity="0.9" stroke="#475569" stroke-opacity="0.6" stroke-width="1" />
    <circle cx="-85" cy="0" r="4.5" fill="#22c55e" />
    <text x="-68" y="5" font-family="'Outfit', 'Inter', 'Segoe UI', system-ui, sans-serif" font-size="15" font-weight="600" fill="#f8fafc" letter-spacing="1">motionly.media</text>
  </g>
</svg>`;

async function build() {
  const buffer = await sharp(Buffer.from(svg)).png({ quality: 100 }).toBuffer();

  fs.writeFileSync('public/og-image.png', buffer);
  fs.writeFileSync('public/og-image-v2.png', buffer);

  // JPEG fallback
  await sharp(Buffer.from(svg)).jpeg({ quality: 95 }).toFile('public/og-image.jpg');
  await sharp(Buffer.from(svg)).jpeg({ quality: 95 }).toFile('public/og-image-v2.jpg');

  console.log('Successfully generated public/og-image-v2.png and public/og-image.png!');
}

build().catch(console.error);
