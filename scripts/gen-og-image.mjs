import sharp from 'sharp';
import fs from 'node:fs';

// 1200x630 OG image as SVG, then convert to PNG
const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f1117"/>
      <stop offset="100%" style="stop-color:#1a1d2e"/>
    </linearGradient>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#6366f1"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#312e81;stop-opacity:0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle glow blob top-right -->
  <ellipse cx="1050" cy="150" rx="400" ry="300" fill="url(#glow)"/>

  <!-- Border -->
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#2e3348" stroke-width="2"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="3" fill="url(#brand)"/>

  <!-- Logo / Icon area -->
  <text x="80" y="210" font-family="system-ui, -apple-system, sans-serif" font-size="80" fill="#818cf8">⚡</text>

  <!-- Site name -->
  <text x="80" y="295" font-family="system-ui, -apple-system, 'PingFang SC', sans-serif" font-size="64" font-weight="700" fill="#ffffff">CodePick</text>

  <!-- Tagline -->
  <text x="80" y="365" font-family="system-ui, -apple-system, 'PingFang SC', sans-serif" font-size="32" fill="#94a3b8">AI 编程工具选型指南</text>

  <!-- Description -->
  <text x="80" y="420" font-family="system-ui, -apple-system, 'PingFang SC', sans-serif" font-size="24" fill="#64748b">帮助中国开发者选择最适合的 AI 编程方案</text>

  <!-- Tool badges -->
  <rect x="80" y="470" width="160" height="44" rx="8" fill="#1e2030" stroke="#2e3348" stroke-width="1"/>
  <text x="160" y="498" font-family="system-ui, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Cursor</text>

  <rect x="256" y="470" width="160" height="44" rx="8" fill="#1e2030" stroke="#2e3348" stroke-width="1"/>
  <text x="336" y="498" font-family="system-ui, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Copilot</text>

  <rect x="432" y="470" width="160" height="44" rx="8" fill="#1e2030" stroke="#2e3348" stroke-width="1"/>
  <text x="512" y="498" font-family="system-ui, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Cline</text>

  <rect x="608" y="470" width="200" height="44" rx="8" fill="#1e2030" stroke="#2e3348" stroke-width="1"/>
  <text x="708" y="498" font-family="system-ui, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Claude Code</text>

  <rect x="824" y="470" width="160" height="44" rx="8" fill="#1e2030" stroke="#2e3348" stroke-width="1"/>
  <text x="904" y="498" font-family="system-ui, sans-serif" font-size="20" fill="#94a3b8" text-anchor="middle">Aider</text>

  <!-- URL -->
  <text x="1120" y="598" font-family="system-ui, sans-serif" font-size="22" fill="#4f46e5" text-anchor="end">codepick.dev</text>
</svg>`;

const outputPath = 'public/og-image.png';

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(() => console.log(`✅ OG image generated: ${outputPath}`))
  .catch(err => {
    console.error('Failed:', err);
    process.exit(1);
  });
