'use client'
import { useState, useEffect, useRef } from 'react'

type Project = {
  id: string; title: string; description: string; image: string | null;
  link: string | null; company: string | null; tags: string[]
}

export default function ProjectModal({
  open, data, onClose, onSave,
}: {
  open: boolean
  data?: Project
  onClose: () => void
  onSave: (data: Omit<Project, 'id'> & { id?: string }) => Promise<void>
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [company, setCompany] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (data) {
      setTitle(data.title); setDescription(data.description)
      setLink(data.link || ''); setCompany(data.company || '')
      setTags(data.tags || []); setImage(data.image || null)
    } else {
      setTitle(''); setDescription(''); setLink(''); setCompany('')
      setTags([]); setImage(null)
    }
  }, [data, open])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      setImage(url)
    }
    setUploading(false)
  }

  const addTag = (val: string) => {
    const trimmed = val.trim().replace(/,$/, '')
    if (trimmed && !tags.includes(trimmed)) setTags(prev => [...prev, trimmed])
    setTagInput('')
  }

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) { e.preventDefault(); addTag(tagInput) }
    if (e.key === 'Backspace' && !tagInput && tags.length) setTags(prev => prev.slice(0, -1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return
    setSaving(true)
    await onSave({ id: data?.id, title, description, link: link || null, company: company || null, tags, image })
    setSaving(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-all"
      style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="text-base font-bold">{data ? 'Edit Project' : 'Tambah Project Baru'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Gambar Project</label>
            <div className="relative rounded-xl overflow-hidden cursor-pointer transition-all"
              style={{ border: '2px dashed var(--border)', minHeight: 140 }}
              onClick={() => fileRef.current?.click()}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-1)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              {image ? (
                <>
                  <img src={image} alt="preview" className="w-full h-40 object-cover" />
                  <button type="button" onClick={e => { e.stopPropagation(); setImage(null) }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs text-white"
                    style={{ background: 'rgba(0,0,0,.7)' }}>✕</button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <span className="text-3xl">{uploading ? '⏳' : '🖼️'}</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {uploading ? 'Mengupload...' : 'Klik untuk upload gambar'}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>JPG, PNG, WebP — Max 5MB</span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <FormField label="Judul Project *" required>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Contoh: E-Commerce Mobile App" required className="form-input-admin" />
          </FormField>

          {/* Link */}
          <FormField label="Link Project" hint="URL repository, demo, atau website">
            <input value={link} onChange={e => setLink(e.target.value)} type="url" placeholder="https://github.com/..." className="form-input-admin" />
          </FormField>

          {/* Company */}
          <FormField label="Perusahaan (Opsional)">
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Nama perusahaan tempat project dibuat" className="form-input-admin" />
          </FormField>

          {/* Description */}
          <FormField label="Deskripsi Project *" required>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4}
              placeholder="Jelaskan project ini — fitur utama, teknologi, dampaknya..." className="form-input-admin resize-y" />
          </FormField>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>Tech Stack / Tags</label>
            <div className="flex flex-wrap gap-2 p-2 rounded-lg min-h-[44px] items-center"
              style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)' }}
              onClick={() => document.getElementById('tagInput')?.focus()}>
              {tags.map(t => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
                  style={{ background: 'rgba(99,102,241,.15)', color: 'var(--accent-1)' }}>
                  {t}
                  <button type="button" onClick={() => setTags(prev => prev.filter(x => x !== t))}
                    className="text-xs leading-none" style={{ color: 'var(--accent-1)' }}>×</button>
                </span>
              ))}
              <input id="tagInput" value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagKey} onBlur={() => tagInput && addTag(tagInput)}
                placeholder={tags.length ? '' : 'Ketik lalu Enter...'} className="border-none outline-none bg-transparent text-sm flex-1 min-w-20"
                style={{ color: 'var(--text-primary)' }} />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Tekan Enter atau koma setelah setiap item</p>
          </div>

          <div className="flex justify-end gap-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            <button type="button" onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
              Batal
            </button>
            <button type="submit" disabled={saving || uploading}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-px disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,.3)' }}>
              {saving ? '⏳ Menyimpan...' : '💾 Simpan Project'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .form-input-admin {
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
        }
        .form-input-admin:focus {
          border-color: var(--accent-1);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
      `}</style>
    </div>
  )
}

function FormField({ label, children, hint, required }: { label: string; children: React.ReactNode; hint?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
        {label} {!required && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span>}
      </label>
      {children}
      {hint && <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{hint}</p>}
    </div>
  )
}
