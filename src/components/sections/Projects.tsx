import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { content } from '../../data/content'

const statusLabel: Record<string, string> = {
  live: 'Live',
  shipped: 'Shipped',
  'in-progress': 'In progress',
}

export default function Projects() {
  const featured = content.projects.find((p) => p.featured)!
  const rest = content.projects.filter((p) => !p.featured)

  return (
    <section id="work" aria-labelledby="work-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-section sm:px-6">
        <h2 id="work-heading" className="text-title font-bold tracking-[-0.02em]">
          Things I've shipped
        </h2>

        {/* Featured: TindaPOS — deliberately bigger, violet-committed */}
        <article className="mt-12 overflow-hidden rounded-2xl bg-accent-solid text-white">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
            <div>
              <p className="font-mono text-sm text-white/70">
                Featured · {statusLabel[featured.status]} · {featured.role}
              </p>
              <h3 className="mt-3 text-heading font-extrabold tracking-[-0.02em] sm:text-[2.4rem] sm:leading-[1.1]">
                {featured.name}
              </h3>
              <p className="mt-4 max-w-[55ch] text-white/90">{featured.summary}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                {featured.live && (
                  <a
                    href={featured.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg bg-white px-5 font-semibold text-accent-solid transition-colors duration-200 hover:bg-white/90"
                  >
                    Open the live app <ExternalLink size={15} aria-hidden />
                  </a>
                )}
                {featured.repo && (
                  <a
                    href={featured.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/40 px-5 font-medium text-white transition-colors duration-200 hover:border-white"
                  >
                    Source <ArrowUpRight size={15} aria-hidden />
                  </a>
                )}
              </div>
            </div>

            <div>
              <ul className="flex flex-col gap-3">
                {featured.highlights.map((h) => (
                  <li key={h.slice(0, 20)} className="flex gap-3 text-sm text-white/90">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-xs text-white/60">{featured.stack.join(' · ')}</p>
            </div>
          </div>
        </article>

        {/* Rest: compact rows, not identical cards */}
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {rest.map((p) => (
            <li key={p.slug}>
              <article className="grid gap-3 py-6 sm:grid-cols-[1fr_2fr_auto] sm:gap-6">
                <div>
                  <h3 className="font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 font-mono text-xs text-ink-soft">
                    {statusLabel[p.status]} · {p.role}
                  </p>
                </div>
                <div>
                  <p className="max-w-[60ch] text-sm text-ink-soft">{p.summary}</p>
                  <p className="mt-2 font-mono text-xs text-ink-soft/80">{p.stack.join(' · ')}</p>
                </div>
                <div className="sm:self-center">
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.name} source on GitHub`}
                      className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-md px-3 text-sm font-medium text-accent transition-colors duration-200 hover:bg-surface"
                    >
                      Repo <ArrowUpRight size={14} aria-hidden />
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
