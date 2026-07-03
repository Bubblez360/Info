import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { content } from '../../data/content'
import MobileMenu from './MobileMenu'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { theme, toggle } = useTheme()
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="font-mono text-sm font-medium text-ink">
          {content.identity.nickname.toLowerCase()}
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? 'true' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors duration-200 hover:text-ink ${
                    active === l.href.slice(1) ? 'font-semibold text-accent' : 'text-ink-soft'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-ink-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
          </button>
          <MobileMenu links={links} />
        </div>
      </nav>
    </header>
  )
}
