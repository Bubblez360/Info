import { useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

export default function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const open = () => dialogRef.current?.showModal()
  const close = () => dialogRef.current?.close()

  // close on anchor navigation
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A') close()
      // click on backdrop (outside inner panel) closes
      if (e.target === dialog) close()
    }
    dialog.addEventListener('click', onClick)
    return () => dialog.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={open}
        aria-label="Open navigation menu"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-ink-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
      >
        <Menu size={20} aria-hidden />
      </button>

      {/* native <dialog>: focus trap, Esc-close, top layer — no stacking-context clipping */}
      <dialog
        ref={dialogRef}
        aria-label="Navigation"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/40"
      >
        <div className="ml-auto flex h-full w-64 flex-col gap-1 border-l border-line bg-paper p-4">
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className="mb-4 flex h-11 w-11 cursor-pointer items-center justify-center self-end rounded-md text-ink-soft hover:bg-surface hover:text-ink"
          >
            <X size={20} aria-hidden />
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-4 py-3 text-lg font-medium text-ink transition-colors duration-200 hover:bg-surface hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </div>
      </dialog>
    </div>
  )
}
