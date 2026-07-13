type Experience = {
  id: string
  company: string
  position: string
  description: string
  location: string | null
  startDate: string
  isCurrent: boolean
  techStack: string[]
  startDateFormatted: string
  endDateFormatted: string
  duration: string
}

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--accent-1)' }}>
          <span className="w-6 h-0.5 rounded" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }} />
          Perjalanan Karir
        </span>
        <h2 className="text-4xl font-extrabold mb-3 leading-tight">
          Pengalaman <span className="gradient-text">Kerja</span>
        </h2>
        <p className="mb-16 text-base leading-7 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
          Rekam jejak profesional saya dalam dunia pengembangan software.
        </p>

        {experiences.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            Belum ada pengalaman kerja. Tambahkan di <a href="/admin" style={{ color: 'var(--accent-1)' }}>Admin Panel</a>.
          </div>
        ) : (
          <div className="relative pl-6" style={{ borderLeft: '2px solid transparent', borderImage: 'linear-gradient(to bottom, #6366f1, #8b5cf6, transparent) 1' }}>
            {experiences.map((e, i) => (
              <div key={e.id} className="relative mb-14 last:mb-0" style={{ paddingLeft: '2rem' }}>
                {/* Timeline dot */}
                <div className={`absolute -left-[2.65rem] top-2 w-4 h-4 rounded-full ${e.isCurrent ? 'pulse-glow' : ''}`}
                  style={{
                    background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                    boxShadow: e.isCurrent ? undefined : '0 0 0 4px var(--bg-primary)',
                  }} />

                <div className="mb-1.5">
                  <div className="text-xl font-extrabold">{e.company}</div>
                  <div className="text-base font-semibold mt-0.5" style={{ color: 'var(--accent-1)' }}>{e.position}</div>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>📅 {e.startDateFormatted} — {e.endDateFormatted}</span>
                    {e.duration && <span>⏱ {e.duration}</span>}
                    {e.location && <span>📍 {e.location}</span>}
                    {e.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ background: 'rgba(34,197,94,.12)', border: '1px solid rgba(34,197,94,.25)', color: '#22c55e' }}>
                        ● Sekarang
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm leading-7 mb-3" style={{ color: 'var(--text-secondary)' }}>{e.description}</p>

                {e.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {e.techStack.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-xs font-semibold font-mono"
                        style={{ background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.2)', color: 'var(--accent-2)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
