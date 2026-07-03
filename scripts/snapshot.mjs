/**
 * GitHub snapshot generator (decisions F1/F5/E1).
 * Fetches public repo data for Bubblez360, writes src/data/snapshot.json.
 * Run weekly by .github/workflows/snapshot.yml (commit doubles as repo
 * activity so the scheduled workflow never hits the 60-day suspension).
 * Exits non-zero on any failure so the Action fails LOUDLY (GitHub emails
 * the owner) instead of committing garbage.
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const USER = 'Bubblez360'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'snapshot.json')

export async function buildSnapshot(fetchImpl = fetch) {
  const res = await fetchImpl(
    `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
    { headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-snapshot' } },
  )
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
  const repos = await res.json()
  if (!Array.isArray(repos) || repos.length === 0) {
    throw new Error('GitHub API returned no repositories — refusing to write empty snapshot')
  }

  const own = repos.filter((r) => !r.fork)
  const languages = {}
  for (const r of own) {
    if (r.language) languages[r.language] = (languages[r.language] ?? 0) + 1
  }
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  const languageShare = Object.entries(languages)
    .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6)

  const lastActive = own[0]?.updated_at?.slice(0, 10) ?? null // own is updated-sorted from the API

  // hiring-signal order beats raw stars: flagship work first, then stars/recency
  const PINNED = ['SimplePosSystem', 'Upstaff_dashboard_nideps', 'enrollment-frontend', 'BuBzArtwork']
  const rank = (r) => {
    const i = PINNED.indexOf(r.name)
    return i === -1 ? PINNED.length : i
  }
  const featured = [...own]
    .sort(
      (a, b) =>
        rank(a) - rank(b) ||
        (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0) ||
        (b.updated_at > a.updated_at ? 1 : -1),
    )
    .slice(0, 4)
    .map((r) => ({
      name: r.name,
      url: r.html_url,
      stars: r.stargazers_count ?? 0,
      language: r.language ?? '—',
      description: r.description ?? '',
    }))

  return {
    generatedAt: new Date().toISOString().slice(0, 10),
    user: USER,
    profileUrl: `https://github.com/${USER}`,
    publicRepos: own.length,
    lastActive,
    languageShare,
    featured,
  }
}

// invoked directly (not imported by tests)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const snapshot = await buildSnapshot()
    writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + '\n')
    console.log(`snapshot written: ${OUT} (${snapshot.publicRepos} repos)`)
  } catch (err) {
    console.error('snapshot generation FAILED:', err.message)
    process.exit(1)
  }
}
