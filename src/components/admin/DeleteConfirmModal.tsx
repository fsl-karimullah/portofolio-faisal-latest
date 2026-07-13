export default function DeleteConfirmModal({
  open, name, onClose, onConfirm,
}: {
  open: boolean
  name?: string
  onClose: () => void
  onConfirm: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,.75)', backdropFilter: 'blur(8px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-sm rounded-2xl text-center p-8"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
        <div className="text-5xl mb-4">🗑️</div>
        <h3 className="text-lg font-bold mb-2">Hapus Item?</h3>
        {name && <p className="text-sm mb-1 font-semibold" style={{ color: 'var(--accent-1)' }}>"{name}"</p>}
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Tindakan ini permanen dan tidak bisa dibatalkan.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
            Batal
          </button>
          <button onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:-translate-y-px"
            style={{ background: '#ef4444' }}>
            Hapus Permanen
          </button>
        </div>
      </div>
    </div>
  )
}
