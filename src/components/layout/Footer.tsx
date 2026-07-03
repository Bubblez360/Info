import { content } from '../../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          {content.identity.name} · {content.identity.location}
        </p>
        <p className="font-mono text-xs">
          designed &amp; built by me, AI-assisted — the calls are mine
        </p>
      </div>
    </footer>
  )
}
