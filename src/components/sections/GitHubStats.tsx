import { ArrowUpRight, Star } from 'lucide-react'
import snapshot from '../../data/snapshot.json'

/**
 * Snapshot-only GitHub viz (decision F5): data bundled at build, refreshed
 * weekly by CI. "As of" caption is the visible staleness surface (E1).
 */
export default function GitHubStats() {
  return (
    <section id="github" aria-labelledby="github-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="github-heading" className="text-title font-bold tracking-[-0.02em]">
            On GitHub
          </h2>
          <p className="font-mono text-xs text-ink-soft">
            {snapshot.publicRepos} public repos · as of {snapshot.generatedAt}
          </p>
        </div>

        {/* language share — one committed bar, not a chart-library widget */}
        <div className="mt-10">
          <div
            className="flex h-3 w-full overflow-hidden rounded-full"
            role="img"
            aria-label={`Language mix: ${snapshot.languageShare.map((l) => `${l.name} ${l.pct}%`).join(', ')}`}
          >
            {snapshot.languageShare.map((l, i) => (
              <span
                key={l.name}
                style={{
                  width: `${l.pct}%`,
                  background: `oklch(${62 - i * 6}% ${0.19 - i * 0.02} ${292 + i * 8})`,
                }}
              />
            ))}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {snapshot.languageShare.map((l, i) => (
              <li key={l.name} className="flex items-center gap-1.5 font-mono text-xs text-ink-soft">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: `oklch(${62 - i * 6}% ${0.19 - i * 0.02} ${292 + i * 8})` }}
                />
                {l.name} {l.pct}%
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {snapshot.featured.map((r) => (
            <li key={r.name} className="bg-paper">
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full cursor-pointer flex-col gap-2 p-5 transition-colors duration-200 hover:bg-surface"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-medium text-ink group-hover:text-accent">
                    {r.name}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-ink-soft">
                    {r.stars > 0 && (
                      <span className="flex items-center gap-1">
                        <Star size={12} aria-hidden /> {r.stars}
                      </span>
                    )}
                    <ArrowUpRight size={14} aria-hidden />
                  </span>
                </span>
                {r.description && <span className="text-sm text-ink-soft">{r.description}</span>}
                <span className="mt-auto font-mono text-xs text-ink-soft/80">{r.language}</span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={snapshot.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex cursor-pointer items-center gap-1.5 font-medium text-accent transition-colors duration-200 hover:text-accent-bright"
        >
          Full profile on GitHub <ArrowUpRight size={15} aria-hidden />
        </a>
      </div>
    </section>
  )
}
