'use client'
import { useState, useEffect } from 'react'

type Experience = {
  id: string; company: string; position: string; description: string;
  location: string | null; startDate: string; endDate: string | null;
  isCurrent: boolean; techStack: string[]
}

export default function ExperienceModal({
  open, data, onClose, onSave,
}: {
  open: boolean
  data?: Experience
  onClose: () => void
  onSave: (data: Omit<Experience, 'id'> & { id?: string }) => Promise<void>
}) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isCurrent, setIsCurrent] = useState(false)
  const [description, setDescription] = useState('')
  const [techStack, setTechStack] = useState<string[]>([])
  const [techInput, setTechInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setCompany(data.company); setPosition(data.position); setLocation(data.location || '')
      setStartDate(data.startDate); setEndDate(data.endDate || ''); setIsCurrent(data.isCurrent)
      setDescription(data.description); setTechStack(data.techStack || [])
    } else {
      setCompany(''); setPosition(''); setLocation(''); setStartDate('')
      setEndDate(''); setIsCurrent(false); setDescription(''); setTechStack([])
    }
    setTechInput('')
  }, [data, open])

  const addTech = (val: string) => {
    const trimmed = val.trim().replace(/,$/, '')
    if (trimmed && !techStack.includes(trimmed)) setTechStack(prev => [...prev, trimmed])
    setTechInput('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!company || !position || !startDate || !description) return
    setSaving(true)
    await onSave({
      id: data?.id, company, position, location: location || null,
      startDate, endDate: isCurrent ? null : (endDate || null),
      isCurrent, description, techStack,
    })
    setSaving(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-base font-bold">{data ? 'Edit Pengalaman Kerja' : 'Tambah Pengalaman Kerja'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <EField label="Nama Perusahaan *">
              <input value={company} onChange={e => setCompany(e.target.value)} placeholder="PT Galeri 24" required className="ei" />
            </EField>
            <EField label="Posisi / Jabatan *">
              <input value={position} onChange={e => setPosition(e.target.value)} placeholder="Full Stack Developer" required className="ei" />
            </EField>
          </div>

          <EField label="Lokasi (Opsional)">
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Jakarta, Indonesia / Remote" className="ei" />
          </EField>

          <div className="grid grid-cols-2 gap-4">
            <EField label="Tanggal Mulai *">
              <input type="month" value={startDate} onChange={e => setStartDate(e.target.value)} required className="ei" />
            </EField>
            <EField label="Tanggal Selesai">
              <input type="month" value={endDate} onChange={e => setEndDate(e.target.value)}
                disabled={isCurrent} className="ei disabled:opacity-40 disabled:cursor-not-allowed" />
            </EField>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="isCurrent" checked={isCurrent} onChange={e => setIsCurrent(e.target.checked)}
              className="w-4 h-4 cursor-pointer" style={{ accentColor: 'var(--accent-1)' }} />
            <label htmlFor="isCurrent" className="text-sm font-medium cursor-pointer">Masih bekerja di sini (sampai sekarang)</label>
          </div>

          <EField label="Deskripsi Pekerjaan *">
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4}
              placeholder="Deskripsikan tanggung jawab, pencapaian, dan kontribusi Anda..." className="ei resize-y" />
          </EField>

          {/* Tech Stack Tags */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Tech Stack</label>
            <div className="flex flex-wrap gap-2 p-2 rounded-lg min-h-[44px] items-center"
              style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)' }}>
              {techStack.map(t => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold font-mono"
                  style={{ background: 'rgba(139,92,246,.15)', color: 'var(--accent-2)' }}>
                  {t}
                  <button type="button" onClick={() => setTechStack(prev => prev.filter(x => x !== t))} className="text-xs leading-none">×</button>
                </span>
              ))}
              <input value={techInput} onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => {
                  if ((e.key === 'Enter' || e.key === ',') && techInput.trim()) { e.preventDefault(); addTech(techInput) }
                  if (e.key === 'Backspace' && !techInput && techStack.length) setTechStack(prev => prev.slice(0, -1))
                }}
                onBlur={() => techInput && addTech(techInput)}
                placeholder={techStack.length ? '' : 'Ketik lalu Enter...'}
                className="border-none outline-none bg-transparent text-sm flex-1 min-w-20"
                style={{ color: 'var(--text-primary)' }} />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Tekan Enter atau koma setelah setiap item</p>
          </div>

          <div className="flex justify-end gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              Batal
            </button>
            <button type="submit" disabled={saving}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white hover:-translate-y-px disabled:opacity-60 transition-all"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,.3)' }}>
              {saving ? '⏳ Menyimpan...' : '💾 Simpan'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .ei {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-primary);
          font-family: var(--font-inter), sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
          color-scheme: dark;
        }
        .ei:focus { border-color: var(--accent-1); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
      `}</style>
    </div>
  )
}

function EField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>{label}</label>
      {children}
    </div>
  )
}
