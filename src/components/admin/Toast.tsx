'use client'
import { useEffect, useState } from 'react'

export default function Toast({ msg, type }: { msg: string; type: 'success' | 'error' }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
    return () => setVisible(false)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-medium"
      style={{
        background: 'var(--bg-secondary)',
        border: `1px solid ${type === 'success' ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'}`,
        boxShadow: '0 8px 32px rgba(0,0,0,.4)',
        backdropFilter: 'blur(10px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        transition: 'all 0.3s ease',
        minWidth: 240,
      }}>
      <span style={{ fontSize: '1.1rem' }}>{type === 'success' ? '✅' : '❌'}</span>
      <span>{msg}</span>
    </div>
  )
}
