import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'
import { nanoid } from 'nanoid'

export async function GET() {
  try {
    const allProjects = await db.select().from(projects).orderBy(projects.createdAt)
    return NextResponse.json({ projects: allProjects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: '获取项目列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, questions, answers, documents } = await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { error: '项目标题和描述不能为空' },
        { status: 400 }
      )
    }

    const project = {
      id: nanoid(),
      title,
      description,
      questions: questions || null,
      answers: answers || null,
      documents: documents || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const [newProject] = await db.insert(projects).values(project).returning()
    
    return NextResponse.json({ project: newProject })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: '创建项目失败' },
      { status: 500 }
    )
  }
}