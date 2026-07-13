'use client'
import { useEffect, useRef } from 'react'

const SKILLS = [
  { name: 'React.js / Next.js', pct: 90 },
  { name: 'React Native', pct: 85 },
  { name: 'JavaScript / TypeScript', pct: 88 },
  { name: 'CSS / UI·UX Design', pct: 92 },
  { name: 'Laravel / PHP', pct: 65 },
]

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll<HTMLElement>('.skill-fill').forEach(el => {
              el.classList.add('animated')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {SKILLS.map(s => (
        <div key={s.name}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.name}</span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{s.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div className="skill-fill" style={{ '--pct': s.pct / 100 } as React.CSSProperties & { '--pct': number }} />
          </div>
        </div>
      ))}
      <style>{`.skill-fill.animated { transform: scaleX(var(--pct)) !important; }`}</style>
    </div>
  )
}
