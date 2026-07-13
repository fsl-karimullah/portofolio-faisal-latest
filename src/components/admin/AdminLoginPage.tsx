'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.refresh()
    } else {
      setError('Password salah. Coba lagi.')
      setLoading(false)
      setPw('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>
      {/* Orbs */}
      <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: '#6366f1', filter: 'blur(80px)' }} />
      <div className="absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full opacity-20"
        style={{ background: '#8b5cf6', filter: 'blur(80px)' }} />

      <div className="relative w-full max-w-sm mx-6 p-10 rounded-2xl animate-fadeInUp"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', backdropFilter: 'blur(20px)' }}>
        <div className="text-2xl font-black gradient-text mb-1 tracking-tight">AF. Admin</div>
        <p className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Panel administrasi portfolio Amir Faisal</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Masukkan password..."
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                color: 'var(--text-primary)', fontFamily: 'var(--font-inter)',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-1)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,.15)' }}
              onBlur={e => { e.currentTarget.style.borderColor = error ? 'var(--danger)' : 'var(--border)'; e.currentTarget.style.boxShadow = '' }}
            />
            {error && <p className="text-xs mt-2" style={{ color: '#ef4444' }}>⚠️ {error}</p>}
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-lg font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,.35)' }}>
            {loading ? '⏳ Memverifikasi...' : 'Masuk ke Admin Panel'}
          </button>
        </form>

        <p className="text-center mt-6">
          <a href="/" className="text-xs transition-colors" style={{ color: 'var(--accent-3)' }}>
            ← Kembali ke Portfolio
          </a>
        </p>
      </div>
    </div>
  )
}
