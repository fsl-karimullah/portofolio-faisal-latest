export function parseTags(tagsStr: string): string[] {
  try {
    return JSON.parse(tagsStr)
  } catch {
    return []
  }
}

export function stringifyTags(tags: string[]): string {
  return JSON.stringify(tags)
}

const MONTHS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  return `${MONTHS[parseInt(month) - 1]} ${year}`
}

export function calcDuration(startStr: string, endStr?: string | null): string {
  if (!startStr) return ''
  const start = new Date(startStr + '-01')
  const end = endStr ? new Date(endStr + '-01') : new Date()
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())
  if (months < 1) return '< 1 bln'
  const y = Math.floor(months / 12)
  const m = months % 12
  return [y > 0 ? `${y} thn` : '', m > 0 ? `${m} bln` : ''].filter(Boolean).join(' ')
}

export function verifyAdminPassword(pw: string): boolean {
  return pw === process.env.ADMIN_PASSWORD
}
