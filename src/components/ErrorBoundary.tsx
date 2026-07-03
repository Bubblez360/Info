import { Component, type ReactNode } from 'react'
import { content } from '../data/content'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Unhandled render error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6">
          <h1 className="text-title font-bold">Something broke.</h1>
          <p className="text-ink-soft">
            That's on me, not you. Refresh the page — or tell me it happened:{' '}
            <a href={`mailto:${content.identity.email}`} className="font-semibold text-accent underline">
              {content.identity.email}
            </a>
          </p>
        </main>
      )
    }
    return this.props.children
  }
}
