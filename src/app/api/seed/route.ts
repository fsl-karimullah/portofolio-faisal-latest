import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stringifyTags } from '@/lib/utils'

// POST /api/seed — Seeds initial data
export async function POST() {
  try {
    // Check if already seeded
    const existingProjects = await prisma.project.count()
    const existingExps = await prisma.experience.count()

    if (existingProjects > 0 || existingExps > 0) {
      return NextResponse.json({ message: 'Already seeded', skipped: true })
    }

    // Seed Projects
    await prisma.project.createMany({
      data: [
        {
          title: 'E-Commerce Mobile App',
          description: 'Aplikasi belanja online berbasis React Native dengan fitur real-time cart, payment gateway Midtrans, dan push notification. Dibangun dengan arsitektur modular dan performa tinggi untuk pengalaman belanja yang seamless.',
          image: null,
          link: 'https://github.com/amirfaisal',
          company: 'PT Galeri 24',
          tags: stringifyTags(['React Native', 'Node.js', 'MongoDB']),
          order: 1,
        },
        {
          title: 'Dashboard Operasional Panel',
          description: 'Dashboard admin berbasis web untuk manajemen operasional perusahaan. Fitur mencakup laporan real-time, manajemen user, sistem lookup, dan visualisasi data dengan chart interaktif.',
          image: null,
          link: 'https://github.com/amirfaisal',
          company: 'PT Galeri 24',
          tags: stringifyTags(['Angular', 'Laravel', 'MySQL', 'TypeScript']),
          order: 2,
        },
        {
          title: 'Company Profile Website',
          description: 'Website company profile modern dengan desain responsif, animasi smooth, blog terintegrasi, dan form kontak. Dioptimalkan untuk SEO dan performa loading cepat.',
          image: null,
          link: 'https://github.com/amirfaisal',
          company: '',
          tags: stringifyTags(['Next.js', 'React', 'Tailwind CSS']),
          order: 3,
        },
      ],
    })

    // Seed Experiences
    await prisma.experience.createMany({
      data: [
        {
          company: 'PT Galeri 24',
          position: 'Full Stack Developer',
          description: 'Mengembangkan dan memelihara Dashboard Operasional berbasis Angular, mengintegrasikan berbagai fitur seperti manajemen inventori, laporan keuangan, dan sistem notifikasi real-time. Berkontribusi pada pengembangan REST API dengan Laravel.',
          location: 'Jakarta, Indonesia',
          startDate: '2022-01',
          endDate: null,
          isCurrent: true,
          techStack: stringifyTags(['Angular', 'Laravel', 'MySQL', 'React Native', 'TypeScript']),
          order: 1,
        },
        {
          company: 'Freelance',
          position: 'Front End Developer',
          description: 'Mengerjakan berbagai proyek freelance pembuatan website dan aplikasi mobile untuk klien UMKM dan startup. Spesialisasi pada React.js, Next.js, dan React Native dengan fokus pada UI/UX yang menarik dan performa optimal.',
          location: 'Remote',
          startDate: '2021-03',
          endDate: '2022-01',
          isCurrent: false,
          techStack: stringifyTags(['React', 'Next.js', 'React Native', 'JavaScript', 'CSS']),
          order: 2,
        },
      ],
    })

    return NextResponse.json({ message: 'Seeded successfully', seeded: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
