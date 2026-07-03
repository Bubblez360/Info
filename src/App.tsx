import { content } from './data/content'

// Placeholder shell — core sections land after the E2 copy-approval gate.
export default function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-6">
      <h1 className="text-title font-bold">{content.identity.name}</h1>
      <p className="text-ink-soft">{content.identity.title}</p>
      <p className="font-mono text-sm text-accent">build in progress — copy approval gate</p>
    </main>
  )
}
