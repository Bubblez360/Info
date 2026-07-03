import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import {
  Copy,
  Download,
  ExternalLink,
  FolderKanban,
  Mail,
  Moon,
  Search,
  Sun,
  User,
  Wrench,
} from 'lucide-react'
import { content } from '../../data/content'
import { useTheme } from '../../hooks/useTheme'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const run = (action: () => void) => {
    action()
    setOpen(false)
  }

  const jump = (id: string) => () => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed top-[18vh] left-1/2 z-40 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-paper shadow-2xl"
      overlayClassName="fixed inset-0 z-30 bg-ink/30"
    >
      <div className="flex items-center gap-2 border-b border-line px-4">
        <Search size={16} aria-hidden className="shrink-0 text-ink-soft" />
        <Command.Input
          placeholder="Type a command or section…"
          className="h-13 w-full bg-transparent py-4 text-ink outline-none placeholder:text-ink-soft/70"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-xs text-ink-soft">
          esc
        </kbd>
      </div>

      <Command.List className="max-h-[50vh] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-sm text-ink-soft">
          Nothing matches that.
        </Command.Empty>

        <Command.Group
          heading="Go to"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-ink-soft"
        >
          <Item icon={<FolderKanban size={15} aria-hidden />} onSelect={() => run(jump('work'))}>
            Work
          </Item>
          <Item icon={<User size={15} aria-hidden />} onSelect={() => run(jump('about'))}>
            About
          </Item>
          <Item icon={<Wrench size={15} aria-hidden />} onSelect={() => run(jump('skills'))}>
            Skills &amp; certifications
          </Item>
          <Item icon={<Download size={15} aria-hidden />} onSelect={() => run(jump('resume'))}>
            Resume
          </Item>
          <Item icon={<Mail size={15} aria-hidden />} onSelect={() => run(jump('contact'))}>
            Contact
          </Item>
        </Command.Group>

        <Command.Group
          heading="Actions"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-ink-soft"
        >
          <Item
            icon={theme === 'dark' ? <Sun size={15} aria-hidden /> : <Moon size={15} aria-hidden />}
            onSelect={() => run(toggle)}
          >
            Switch to {theme === 'dark' ? 'light' : 'dark'} mode
          </Item>
          <Item
            icon={<Copy size={15} aria-hidden />}
            onSelect={() =>
              run(() => {
                navigator.clipboard.writeText(content.identity.email).catch(() => {})
              })
            }
          >
            Copy email address
          </Item>
          <Item
            icon={<ExternalLink size={15} aria-hidden />}
            onSelect={() => run(() => window.open(content.identity.github, '_blank', 'noopener'))}
          >
            Open GitHub profile
          </Item>
          <Item
            icon={<ExternalLink size={15} aria-hidden />}
            onSelect={() =>
              run(() => window.open('https://simple-pos-system-one.vercel.app', '_blank', 'noopener'))
            }
          >
            Open TindaPOS live app
          </Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  onSelect?: () => void
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink data-[selected=true]:bg-surface data-[selected=true]:text-accent"
    >
      <span className="text-ink-soft">{icon}</span>
      {children}
    </Command.Item>
  )
}
