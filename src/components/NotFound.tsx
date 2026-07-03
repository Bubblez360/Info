export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="text-title font-bold">Nothing lives here.</h1>
      <p className="text-ink-soft">
        The page you're after doesn't exist —{' '}
        <a href="/" className="font-semibold text-accent underline">
          head back home
        </a>
        .
      </p>
    </main>
  )
}
