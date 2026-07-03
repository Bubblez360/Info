/** Generates public/sitemap.xml + robots.txt from VITE_SITE_URL (runs in build script). */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

let url = process.env.VITE_SITE_URL
if (!url) {
  try {
    const env = readFileSync(join(root, '.env'), 'utf8')
    url = env.match(/^VITE_SITE_URL=(.+)$/m)?.[1]?.trim()
  } catch {
    /* fall through */
  }
}
if (!url) {
  console.error('VITE_SITE_URL missing — set it in .env or environment')
  process.exit(1)
}

writeFileSync(
  join(root, 'public', 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url}/</loc><changefreq>monthly</changefreq></url>
</urlset>
`,
)
writeFileSync(
  join(root, 'public', 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${url}/sitemap.xml
`,
)
console.log(`sitemap + robots written for ${url}`)
