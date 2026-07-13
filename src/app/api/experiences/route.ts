import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stringifyTags } from '@/lib/utils'

// GET /api/experiences
export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    })
    return NextResponse.json(experiences)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

// POST /api/experiences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company, position, description, location, startDate, endDate, isCurrent, techStack } = body

    if (!company || !position || !startDate || !description) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const experience = await prisma.experience.create({
      data: {
        company,
        position,
        description,
        location: location || null,
        startDate,
        endDate: isCurrent ? null : (endDate || null),
        isCurrent: Boolean(isCurrent),
        techStack: stringifyTags(techStack || []),
      },
    })
    return NextResponse.json(experience, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
