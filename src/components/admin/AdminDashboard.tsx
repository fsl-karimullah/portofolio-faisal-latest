'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ProjectModal from './ProjectModal'
import ExperienceModal from './ExperienceModal'
import DeleteConfirmModal from './DeleteConfirmModal'
import Toast from './Toast'

type Project = {
  id: string; title: string; description: string; image: string | null;
  link: string | null; company: string | null; tags: string[]
}
type Experience = {
  id: string; company: string; position: string; description: string;
  location: string | null; startDate: string; endDate: string | null;
  isCurrent: boolean; techStack: string[]
}

type Panel = 'overview' | 'projects' | 'experiences'

export default function AdminDashboard({
  projects: initial_projects,
  experiences: initial_experiences,
}: {
  projects: Project[]
  experiences: Experience[]
}) {
  const router = useRouter()
  const [panel, setPanel] = useState<Panel>('overview')
  const [projects, setProjects] = useState(initial_projects)
  const [experiences, setExperiences] = useState(initial_experiences)

  // Modals
  const [projectModal, setProjectModal] = useState<{ open: boolean; data?: Project }>({ open: false })
  const [expModal, setExpModal] = useState<{ open: boolean; data?: Experience }>({ open: false })
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type?: 'project' | 'exp'; id?: string; name?: string }>({ open: false })

  // Toast
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  const refresh = () => router.refresh()

  // ── Logout ──
  const logout = async () => {
    await fetch('/api/auth/login', { method: 'DELETE' })
    router.refresh()
  }

  // ── Projects CRUD ──
  const handleSaveProject = async (data: Omit<Project, 'id'> & { id?: string }) => {
    const isEdit = Boolean(data.id)
    const url = isEdit ? `/api/projects/${data.id}` : '/api/projects'
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) { showToast('Gagal menyimpan project', 'error'); return }
    const saved = await res.json()
    setProjects(prev => isEdit ? prev.map(p => p.id === data.id ? { ...saved, tags: data.tags } : p) : [{ ...saved, tags: data.tags }, ...prev])
    setProjectModal({ open: false })
    showToast(isEdit ? '✅ Project diperbarui!' : '🎉 Project ditambahkan!')
  }

  const handleDeleteProject = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (!res.ok) { showToast('Gagal menghapus project', 'error'); return }
    setProjects(prev => prev.filter(p => p.id !== id))
    setDeleteModal({ open: false })
    showToast('Project dihapus')
  }

  // ── Experiences CRUD ──
  const handleSaveExp = async (data: Omit<Experience, 'id'> & { id?: string }) => {
    const isEdit = Boolean(data.id)
    const url = isEdit ? `/api/experiences/${data.id}` : '/api/experiences'
    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) { showToast('Gagal menyimpan pengalaman', 'error'); return }
    const saved = await res.json()
    setExperiences(prev => isEdit ? prev.map(e => e.id === data.id ? { ...saved, techStack: data.techStack } : e) : [{ ...saved, techStack: data.techStack }, ...prev])
    setExpModal({ open: false })
    showToast(isEdit ? '✅ Pengalaman diperbarui!' : '🎉 Pengalaman ditambahkan!')
  }

  const handleDeleteExp = async (id: string) => {
    const res = await fetch(`/api/experiences/${id}`, { method: 'DELETE' })
    if (!res.ok) { showToast('Gagal menghapus pengalaman', 'error'); return }
    setExperiences(prev => prev.filter(e => e.id !== id))
    setDeleteModal({ open: false })
    showToast('Pengalaman dihapus')
  }

  const confirmDelete = (type: 'project' | 'exp', id: string, name: string) => {
    setDeleteModal({ open: true, type, id, name })
  }

  const NAV_ITEMS: { id: Panel; icon: string; label: string }[] = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'projects', icon: '🗂️', label: 'Projects' },
    { id: 'experiences', icon: '💼', label: 'Pengalaman Kerja' },
  ]

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ── Sidebar ── */}
      <aside className="w-64 flex flex-col flex-shrink-0"
        style={{ background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', position: 'sticky', top: 0, height: '100vh' }}>
        <div className="px-5 py-6" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="text-xl font-black gradient-text tracking-tight">AF. Admin</div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Panel Administrasi Portfolio</div>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <button key={item.id}
              onClick={() => setPanel(item.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all w-full"
              style={{
                background: panel === item.id ? 'rgba(99,102,241,.12)' : 'transparent',
                color: panel === item.id ? 'var(--accent-1)' : 'var(--text-secondary)',
                fontWeight: panel === item.id ? 600 : 500,
              }}>
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
          <a href="/" target="_blank" rel="noopener"
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold w-full mb-2 transition-all"
            style={{ background: 'rgba(6,182,212,.08)', border: '1px solid rgba(6,182,212,.15)', color: 'var(--accent-3)' }}>
            👁️ Lihat Portfolio
          </a>
          <button onClick={logout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all"
            style={{ color: '#ef4444' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            🚪 Keluar
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between px-8 py-5 sticky top-0 z-20"
          style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
          <h1 className="text-lg font-bold">
            {NAV_ITEMS.find(n => n.id === panel)?.icon} {NAV_ITEMS.find(n => n.id === panel)?.label}
          </h1>
          <div>
            {panel === 'projects' && (
              <button onClick={() => setProjectModal({ open: true })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-px"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,.25)' }}>
                ＋ Tambah Project
              </button>
            )}
            {panel === 'experiences' && (
              <button onClick={() => setExpModal({ open: true })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-px"
                style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,.25)' }}>
                ＋ Tambah Pengalaman
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 p-8">
          {/* ── Overview Panel ── */}
          {panel === 'overview' && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  { num: projects.length, label: 'Total Projects', icon: '🗂️' },
                  { num: experiences.length, label: 'Pengalaman Kerja', icon: '💼' },
                  { num: experiences.find(e => e.isCurrent)?.company || '—', label: 'Perusahaan Saat Ini', icon: '🏢' },
                ].map(s => (
                  <div key={s.label} className="p-5 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <div className="text-2xl mb-1">{s.icon}</div>
                    <div className="text-2xl font-black gradient-text">{s.num}</div>
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <h3 className="font-bold mb-2">👋 Selamat Datang di Admin Panel</h3>
                <p className="text-sm leading-7" style={{ color: 'var(--text-secondary)' }}>
                  Gunakan sidebar kiri untuk mengelola konten portfolio.<br />
                  Data tersimpan di <strong style={{ color: 'var(--text-primary)' }}>database SQLite</strong> via Prisma ORM — persisten dan tidak hilang saat refresh.<br /><br />
                  🗂️ <strong>Projects</strong> — Tambah, edit, hapus project portfolio.<br />
                  💼 <strong>Pengalaman Kerja</strong> — Kelola riwayat karir.
                </p>
                <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: 'rgba(99,102,241,.08)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--text-secondary)' }}>
                  🔐 Default password: <code className="font-mono" style={{ color: 'var(--accent-1)' }}>admin123</code> &nbsp;|&nbsp;
                  Ubah di file <code className="font-mono" style={{ color: 'var(--accent-1)' }}>.env</code> → <code className="font-mono" style={{ color: 'var(--accent-1)' }}>ADMIN_PASSWORD=...</code>
                </div>
              </div>
            </div>
          )}

          {/* ── Projects Panel ── */}
          {panel === 'projects' && (
            <div className="flex flex-col gap-4">
              {projects.length === 0 ? (
                <EmptyState icon="🗂️" title="Belum ada project" desc='Klik "+ Tambah Project" untuk memulai.' />
              ) : projects.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-5 rounded-xl transition-all hover:border-indigo-500/30"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl overflow-hidden"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                    {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : '💻'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold">{p.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {p.company ? `📦 ${p.company} · ` : ''}{p.link ? `🔗 ${p.link.slice(0, 50)}...` : 'Tanpa link'}
                    </div>
                    <div className="text-xs mt-1 line-clamp-2 leading-5" style={{ color: 'var(--text-secondary)' }}>{p.description}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.2)', color: 'var(--accent-1)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <IconBtn icon="✏️" title="Edit" onClick={() => setProjectModal({ open: true, data: p })} hoverColor="#6366f1" />
                    <IconBtn icon="🗑️" title="Hapus" onClick={() => confirmDelete('project', p.id, p.title)} hoverColor="#ef4444" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Experience Panel ── */}
          {panel === 'experiences' && (
            <div className="flex flex-col gap-4">
              {experiences.length === 0 ? (
                <EmptyState icon="💼" title="Belum ada pengalaman kerja" desc='Klik "+ Tambah Pengalaman" untuk memulai.' />
              ) : experiences.map(e => (
                <div key={e.id} className="flex items-center gap-4 p-5 rounded-xl transition-all"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg,rgba(99,102,241,.15),rgba(139,92,246,.15))' }}>
                    💼
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold">{e.position}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      🏢 {e.company}{e.location ? ` · 📍 ${e.location}` : ''}
                      {e.isCurrent && <span className="ml-2 px-1.5 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(34,197,94,.12)', color: '#22c55e' }}>● Aktif</span>}
                    </div>
                    <div className="text-xs mt-1 line-clamp-2 leading-5" style={{ color: 'var(--text-secondary)' }}>{e.description}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {e.techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs font-semibold font-mono"
                          style={{ background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.2)', color: 'var(--accent-2)' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <IconBtn icon="✏️" title="Edit" onClick={() => setExpModal({ open: true, data: e })} hoverColor="#6366f1" />
                    <IconBtn icon="🗑️" title="Hapus" onClick={() => confirmDelete('exp', e.id, `${e.position} @ ${e.company}`)} hoverColor="#ef4444" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Modals ── */}
      <ProjectModal
        open={projectModal.open}
        data={projectModal.data}
        onClose={() => setProjectModal({ open: false })}
        onSave={handleSaveProject}
      />
      <ExperienceModal
        open={expModal.open}
        data={expModal.data}
        onClose={() => setExpModal({ open: false })}
        onSave={handleSaveExp}
      />
      <DeleteConfirmModal
        open={deleteModal.open}
        name={deleteModal.name}
        onClose={() => setDeleteModal({ open: false })}
        onConfirm={() => {
          if (deleteModal.type === 'project' && deleteModal.id) handleDeleteProject(deleteModal.id)
          if (deleteModal.type === 'exp' && deleteModal.id) handleDeleteExp(deleteModal.id)
        }}
      />

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}

function IconBtn({ icon, title, onClick, hoverColor }: { icon: string; title: string; onClick: () => void; hoverColor: string }) {
  return (
    <button title={title} onClick={onClick}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all"
      style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = hoverColor; e.currentTarget.style.color = hoverColor; e.currentTarget.style.background = `${hoverColor}15` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}>
      {icon}
    </button>
  )
}

function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="text-center py-20 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px dashed var(--border)' }}>
      <div className="text-5xl mb-3">{icon}</div>
      <div className="font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>{title}</div>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{desc}</div>
    </div>
  )
}
