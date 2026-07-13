import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Amir Faisal Karimullah — Full Stack Developer',
  description:
    'Portfolio Amir Faisal Karimullah — Full Stack Developer dengan 3+ tahun pengalaman. Spesialis React, React Native, Next.js, dan Laravel.',
  keywords: ['Amir Faisal Karimullah', 'Full Stack Developer', 'React', 'React Native', 'Laravel', 'Portfolio'],
  authors: [{ name: 'Amir Faisal Karimullah' }],
  openGraph: {
    title: 'Amir Faisal Karimullah — Full Stack Developer',
    description: 'Portfolio Full Stack Developer dengan spesialisasi Front End.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
