import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const [project] = await db.select().from(projects).where(eq(projects.id, id))
    
    if (!project) {
      return NextResponse.json(
        { error: '项目不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: '获取项目详情失败' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { title, description, questions, answers, documents } = await request.json()

    const [updatedProject] = await db
      .update(projects)
      .set({
        title,
        description,
        questions,
        answers,
        documents,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id))
      .returning()

    if (!updatedProject) {
      return NextResponse.json(
        { error: '项目不存在' },
        { status: 404 }
      )
    }

    return NextResponse.json({ project: updatedProject })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: '更新项目失败' },
      { status: 500 }
    )
  }
}