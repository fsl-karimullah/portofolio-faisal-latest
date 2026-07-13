import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stringifyTags } from '@/lib/utils'

// PUT /api/experiences/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { company, position, description, location, startDate, endDate, isCurrent, techStack } = body

    const experience = await prisma.experience.update({
      where: { id },
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
    return NextResponse.json(experience)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 })
  }
}

// DELETE /api/experiences/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.experience.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 })
  }
}
