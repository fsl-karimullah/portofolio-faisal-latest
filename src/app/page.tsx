import { prisma } from '@/lib/prisma'
import { parseTags, formatDate, calcDuration } from '@/lib/utils'
import NavClient from '@/components/portfolio/NavClient'
import HeroClient from '@/components/portfolio/HeroClient'
import SkillsSection from '@/components/portfolio/SkillsSection'
import ProjectsSection from '@/components/portfolio/ProjectsSection'
import ExperienceSection from '@/components/portfolio/ExperienceSection'
import ContactSection from '@/components/portfolio/ContactSection'
import RevealWrapper from '@/components/portfolio/RevealWrapper'

// Revalidate data every 60 seconds
export const revalidate = 60

async function getData() {
  const [projects, experiences] = await Promise.all([
    prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] }),
    prisma.experience.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] }),
  ])
  return {
    projects: projects.map(p => ({ ...p, tags: parseTags(p.tags) })),
    experiences: experiences.map(e => ({
      ...e,
      techStack: parseTags(e.techStack),
      startDateFormatted: formatDate(e.startDate),
      endDateFormatted: e.isCurrent ? 'Sekarang' : formatDate(e.endDate),
      duration: calcDuration(e.startDate, e.isCurrent ? null : e.endDate),
    })),
  }
}

export default async function HomePage() {
  const { projects, experiences } = await getData()
  const TECHS = [
    { icon: '⚛️', name: 'React.js' }, { icon: '📱', name: 'React Native' },
    { icon: '▲', name: 'Next.js' }, { icon: '🟨', name: 'JavaScript' },
    { icon: '🔷', name: 'TypeScript' }, { icon: '🐘', name: 'Laravel' },
    { icon: '🔺', name: 'Angular' }, { icon: '🐬', name: 'MySQL' },
    { icon: '🍃', name: 'MongoDB' }, { icon: '🎨', name: 'CSS/SCSS' },
    { icon: '🔧', name: 'Git' }, { icon: '🐳', name: 'Docker' },
    { icon: '📦', name: 'Node.js' }, { icon: '🔴', name: 'Redis' },
    { icon: '📡', name: 'REST API' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navigation */}
      <NavClient />

      {/* Hero */}
      <HeroClient projectCount={projects.length} />

      {/* About & Skills */}
      <section id="about" style={{ background: 'var(--bg-secondary)' }} className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <RevealWrapper className="flex flex-col items-center lg:items-start">
              <div className="relative w-64 h-64 mx-auto">
                {/* Spinning ring */}
                <div className="absolute inset-[-8px] rounded-full border-2 border-transparent"
                  style={{
                    background: 'linear-gradient(var(--bg-secondary),var(--bg-secondary)) padding-box, linear-gradient(135deg,#6366f1,#8b5cf6,#06b6d4) border-box',
                    animation: 'spin-slow 8s linear infinite',
                  }}
                />
                <div className="w-64 h-64 rounded-full flex items-center justify-center text-8xl"
                  style={{ background: 'var(--bg-card)', border: '2px solid var(--border)' }}>
                  👨‍💻
                </div>
                {/* Floating badges */}
                <div className="absolute top-4 -right-12 px-3 py-2 rounded-lg text-xs font-bold text-indigo-400 whitespace-nowrap"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', animation: 'float 4s ease-in-out infinite' }}>
                  ⚛️ React Expert
                </div>
                <div className="absolute bottom-12 -right-16 px-3 py-2 rounded-lg text-xs font-bold text-purple-400 whitespace-nowrap"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', animation: 'float 4s ease-in-out infinite 1.5s' }}>
                  📱 Mobile Dev
                </div>
                <div className="absolute bottom-4 -left-12 px-3 py-2 rounded-lg text-xs font-bold text-cyan-400 whitespace-nowrap"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', animation: 'float 4s ease-in-out infinite 3s' }}>
                  🐘 Laravel
                </div>
              </div>
            </RevealWrapper>

            {/* Content */}
            <RevealWrapper>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: 'var(--accent-1)' }}>
                <span className="w-6 h-0.5 rounded" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }} />
                Tentang Saya
              </span>
              <h2 className="text-4xl font-extrabold mb-4 leading-tight">
                Passionate <span className="gradient-text">Front End</span> Developer
              </h2>
              <p className="text-base leading-8 mb-8" style={{ color: 'var(--text-secondary)' }}>
                Halo! Saya <strong style={{ color: 'var(--text-primary)' }}>Amir Faisal Karimullah</strong>, Full Stack Developer
                dengan <strong style={{ color: 'var(--text-primary)' }}>3+ tahun pengalaman</strong> membangun aplikasi web dan mobile.
                <br /><br />
                Saya paling menikmati pekerjaan di sisi <strong style={{ color: 'var(--text-primary)' }}>Front End</strong> — membangun
                antarmuka yang tidak hanya indah secara visual, tapi juga responsif dan intuitif. Solid di{' '}
                <strong style={{ color: 'var(--text-primary)' }}>React.js, Next.js, dan React Native</strong>.
                <br /><br />
                Di backend, familiar dengan <strong style={{ color: 'var(--text-primary)' }}>Laravel & REST API</strong>, siap menangani
                proyek fullstack dari hulu ke hilir.
              </p>
              <SkillsSection />
            </RevealWrapper>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-10 overflow-hidden" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--accent-1)' }}>
            <span className="w-6 h-0.5 rounded" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }} />
            Tech Stack
          </span>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track gap-4 px-4" style={{ display: 'flex', gap: '16px' }}>
            {[...TECHS, ...TECHS].map((t, i) => (
              <div key={i}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <span>{t.icon}</span>{t.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <ProjectsSection projects={projects} />

      {/* Experience */}
      <ExperienceSection experiences={experiences} />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xl font-black gradient-text">AF.</div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>© 2024 Amir Faisal Karimullah. Dibuat dengan ❤️</p>
          <div className="flex gap-3">
            {[
              { href: 'https://github.com/amirfaisal', icon: '🐙', label: 'GitHub' },
              { href: 'https://linkedin.com/in/amirfaisal', icon: '💼', label: 'LinkedIn' },
              { href: 'mailto:amirfaisal@email.com', icon: '📧', label: 'Email' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" title={l.label}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                {l.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
