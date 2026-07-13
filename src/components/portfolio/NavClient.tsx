'use client'
import { useState, useEffect } from 'react'

const LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function NavClient() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const ids = ['hero', 'about', 'projects', 'experience', 'contact']
      const scrollPos = window.scrollY + 100
      for (const id of ids.reverse()) {
        const el = document.getElementById(id)
        if (el && scrollPos >= el.offsetTop) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,10,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="text-xl font-black gradient-text tracking-tight">AF.</a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: active === l.href.slice(1) ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: active === l.href.slice(1) ? 'var(--bg-card)' : 'transparent',
              }}>
              {l.label}
            </a>
          ))}
          {/* <a href="/admin"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-px"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,.3)' }}>
            ⚙️ Admin
          </a> */}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="w-6 h-0.5 rounded transition-all" style={{ background: 'var(--text-primary)', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : '' }} />
          <span className="w-6 h-0.5 rounded transition-all" style={{ background: 'var(--text-primary)', opacity: menuOpen ? 0 : 1 }} />
          <span className="w-6 h-0.5 rounded transition-all" style={{ background: 'var(--text-primary)', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : '' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1"
          style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}>
              {l.label}
            </a>
          ))}
          {/* <a href="/admin" className="px-4 py-3 rounded-lg text-sm font-semibold text-white mt-2"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
            ⚙️ Admin Panel
          </a> */}
        </div>
      )}
    </nav>
  )
}
