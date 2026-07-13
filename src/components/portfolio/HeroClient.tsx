'use client'
import { useEffect, useState } from 'react'

const WORDS = ['Front End Developer', 'React Native Dev', 'Full Stack Developer', 'UI Enthusiast', 'Laravel Developer']

export default function HeroClient({ projectCount }: { projectCount: number }) {
  const [typed, setTyped] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const current = WORDS[wordIdx]
    const timer = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setTyped(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setCharIdx(0)
          setWordIdx(w => (w + 1) % WORDS.length)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? 55 : 95)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, wordIdx])

  // Counter animation
  useEffect(() => {
    if (count >= projectCount) return
    const t = setTimeout(() => setCount(c => Math.min(c + 1, projectCount)), 120)
    return () => clearTimeout(t)
  }, [count, projectCount])

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full opacity-25"
          style={{ background: '#6366f1', filter: 'blur(80px)', animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: '#8b5cf6', filter: 'blur(80px)', animation: 'float 8s ease-in-out infinite 4s' }} />
        <div className="absolute top-1/2 left-[40%] w-[300px] h-[300px] rounded-full opacity-10"
          style={{ background: '#06b6d4', filter: 'blur(80px)', animation: 'float 8s ease-in-out infinite 2s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Badge */}
        <div className="animate-fadeInUp inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)', backdropFilter: 'blur(10px)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pulse-dot 2s infinite' }} />
          Tersedia untuk proyek freelance &amp; kolaborasi
        </div>

        {/* Title */}
        <h1 className="animate-fadeInUp animate-delay-100 font-black leading-none mb-6"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', letterSpacing: '-0.04em' }}>
          Hi, Saya<br />
          <span className="gradient-text">Amir Faisal</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fadeInUp animate-delay-200 text-lg leading-8 mb-10 max-w-xl"
          style={{ color: 'var(--text-secondary)' }}>
          <span className="font-semibold" style={{ color: 'var(--accent-1)' }}>{typed}</span>
          <span className="cursor-blink" style={{ color: 'var(--accent-1)' }}>|</span>
          <br />
          Membangun pengalaman digital yang indah dan fungsional dengan <em>passion</em> pada UI/UX exceptional.
        </p>

        {/* CTA */}
        <div className="animate-fadeInUp animate-delay-300 flex gap-4 flex-wrap">
          <a href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,.35)' }}>
            🚀 Lihat Projects
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)', backdropFilter: 'blur(10px)' }}>
            💬 Hubungi Saya
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fadeInUp animate-delay-400 flex gap-12 mt-16 flex-wrap">
          {[
            { num: '3+', label: 'Tahun Pengalaman' },
            { num: count.toString(), label: 'Projects Selesai' },
            { num: '5+', label: 'Tech Stack' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-4xl font-black leading-none gradient-text">{s.num}</div>
              <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
