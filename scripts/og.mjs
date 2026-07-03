/**
 * One-shot OG image generator (Scope Decision #1 — STATIC asset).
 * SVG design → public/og.png via sharp. Re-run only when identity copy changes.
 */
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og.png')

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#faf9fc"/>
  <!-- bubble field echo -->
  <circle cx="1010" cy="120" r="130" fill="#8B5CF6" opacity="0.10"/>
  <circle cx="1105" cy="330" r="70"  fill="#6D28D9" opacity="0.14"/>
  <circle cx="950"  cy="470" r="170" fill="#8B5CF6" opacity="0.08"/>
  <circle cx="1130" cy="540" r="46"  fill="#6D28D9" opacity="0.18"/>
  <circle cx="870"  cy="240" r="28"  fill="#6D28D9" opacity="0.22"/>

  <text x="80" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#5b5566" font-weight="500">Zamboanga City, Philippines</text>
  <text x="80" y="280" font-family="Segoe UI, Arial, sans-serif" font-size="84" fill="#17131d" font-weight="800" letter-spacing="-2">I build software that</text>
  <text x="80" y="380" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="800" letter-spacing="-2"><tspan fill="#6D28D9">solves real problems</tspan><tspan fill="#17131d">.</tspan></text>
  <text x="80" y="480" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#5b5566">Angelo "Deps" Depamaylo — Full-Stack Developer · IT Specialist</text>
  <rect x="80" y="530" width="560" height="2" fill="#6D28D9" opacity="0.5"/>
  <text x="80" y="575" font-family="Consolas, monospace" font-size="26" fill="#6D28D9">github.com/Bubblez360</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer()
writeFileSync(out, png)
console.log(`og image written: ${out} (${(png.length / 1024).toFixed(0)} kB)`)
