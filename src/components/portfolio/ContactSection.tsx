'use client'
import { useState } from 'react'

const CONTACTS = [
  { icon: '📧', label: 'Email', value: 'amirfaisal@email.com', href: 'mailto:amirfaisal@email.com' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/amirfaisal', href: 'https://linkedin.com/in/amirfaisal' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/amirfaisal', href: 'https://github.com/amirfaisal' },
  { icon: '📍', label: 'Lokasi', value: 'Jakarta, Indonesia', href: null },
]

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setSent(true); setLoading(false) }, 1500)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" className="py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-1)' }}>
          <span className="w-6 h-0.5 rounded" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }} />
          Kontak
        </span>
        <h2 className="text-4xl font-extrabold mb-3 leading-tight">
          Mari <span className="gradient-text">Berkolaborasi</span>
        </h2>
        <p className="mb-12 text-base leading-7 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
          Punya project menarik atau ingin berdiskusi? Saya selalu terbuka untuk peluang baru.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Cards */}
          <div className="flex flex-col gap-4">
            {CONTACTS.map(c => {
              const inner = (
                <div key={c.label} className="flex items-center gap-4 p-5 rounded-2xl transition-all duration-200 hover:translate-x-1.5 group"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{c.label}</div>
                    <div className="text-sm font-semibold mt-0.5">{c.value}</div>
                  </div>
                </div>
              )
              return c.href
                ? <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer">{inner}</a>
                : <div key={c.label}>{inner}</div>
            })}
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {[
              { id: 'name', label: 'Nama', type: 'text', placeholder: 'Nama Anda' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' },
            ].map(f => (
              <div key={f.id}>
                <label htmlFor={f.id} className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {f.label}
                </label>
                <input id={f.id} type={f.type} placeholder={f.placeholder} required
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)', fontFamily: 'var(--font-inter)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-1)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,.15)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '' }}
                />
              </div>
            ))}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Pesan</label>
              <textarea id="message" rows={4} placeholder="Halo Amir, saya ingin berdiskusi tentang..." required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all resize-y"
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  color: 'var(--text-primary)', fontFamily: 'var(--font-inter)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-1)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,.15)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '' }}
              />
            </div>
            <button type="submit" disabled={loading || sent}
              className="w-full py-3.5 rounded-lg font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,.35)' }}>
              {sent ? '✅ Pesan Terkirim!' : loading ? '⏳ Mengirim...' : 'Kirim Pesan 🚀'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
