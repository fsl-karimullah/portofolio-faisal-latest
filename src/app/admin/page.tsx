import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AdminLoginPage from '@/components/admin/AdminLoginPage'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { prisma } from '@/lib/prisma'
import { parseTags } from '@/lib/utils'

export const metadata = {
  title: 'Admin Panel — Amir Faisal Portfolio',
  robots: 'noindex, nofollow',
}

async function getAdminData() {
  const [projects, experiences] = await Promise.all([
    prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] }),
    prisma.experience.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] }),
  ])
  return {
    projects: projects.map(p => ({ ...p, tags: parseTags(p.tags) })),
    experiences: experiences.map(e => ({ ...e, techStack: parseTags(e.techStack) })),
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  const isAuthenticated = session?.value === 'authenticated'

  if (!isAuthenticated) {
    return <AdminLoginPage />
  }

  const { projects, experiences } = await getAdminData()

  return <AdminDashboard projects={projects} experiences={experiences} />
}
