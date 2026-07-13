'use client'
import Image from 'next/image'

type Project = {
  id: string
  title: string
  description: string
  image: string | null
  link: string | null
  company: string | null
  tags: string[]
}

function getEmoji(tags: string[]) {
  const t = tags.join(' ').toLowerCase()
  if (t.includes('react native') || t.includes('mobile')) return '📱'
  if (t.includes('react') || t.includes('next')) return '⚛️'
  if (t.includes('laravel') || t.includes('php')) return '🐘'
  if (t.includes('angular')) return '🔺'
  if (t.includes('vue')) return '💚'
  return '💻'
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-1)' }}>
          <span className="w-6 h-0.5 rounded" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }} />
          Portfolio
        </span>
        <h2 className="text-4xl font-extrabold mb-3 leading-tight">
          Project <span className="gradient-text">Pilihan</span>
        </h2>
        <p className="mb-12 text-base leading-7 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
          Kumpulan project yang telah saya kerjakan, dari aplikasi mobile hingga dashboard web yang kompleks.
        </p>

        {projects.length === 0 ? (
          <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)' }}>
            <div className="text-5xl mb-4">🗂️</div>
            <p style={{ color: 'var(--text-muted)' }}>Belum ada project. Tambahkan di <a href="/admin" className="underline" style={{ color: 'var(--accent-1)' }}>Admin Panel</a>.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={p.id}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={() => p.link && window.open(p.link, '_blank')}>
                {/* Image */}
                <div className="relative h-48 flex items-center justify-center text-5xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg,#1a1a2e,#16213e)' }}>
                  {p.image ? (
                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                  ) : (
                    <span className="transition-transform group-hover:scale-110 duration-300">{getEmoji(p.tags)}</span>
                  )}
                </div>
                {/* Body */}
                <div className="p-6">
                  {p.company && (
                    <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-3)' }}>
                      📦 {p.company}
                    </div>
                  )}
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm leading-7 mb-4 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    {p.description}
                  </p>
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(99,102,241,.12)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--accent-1)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.link && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                      style={{ color: 'var(--accent-1)' }}>
                      Lihat Project <span>→</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
