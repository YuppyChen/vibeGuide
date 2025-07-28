import { NextRequest, NextResponse } from 'next/server'
import { createAIService, AI_SERVICES } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { description, answers, aiService, customConfig } = await request.json()

    if (!description || !answers) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    // 验证服务选择
    const serviceKey = aiService || 'openrouter'
    if (!AI_SERVICES[serviceKey as keyof typeof AI_SERVICES]) {
      return NextResponse.json(
        { error: '不支持的 AI 服务' },
        { status: 400 }
      )
    }

    const contextInfo = `
项目描述：${description}

问答内容：
${Object.entries(answers).map(([key, value]) => `Q: ${key}\nA: ${value}`).join('\n\n')}
`

    const documentTypes = [
      {
        type: 'userJourney',
        prompt: '请基于以上信息，生成详细的用户旅程地图，包括用户触点、情感曲线、痛点和机会点。'
      },
      {
        type: 'prd',
        prompt: '请基于以上信息，生成完整的产品需求文档(PRD)，包括产品概述、功能需求、非功能需求、用户故事等。'
      },
      {
        type: 'frontend',
        prompt: '请基于以上信息，生成前端设计文档，包括技术栈选择、组件架构、状态管理、UI/UX设计规范等。'
      },
      {
        type: 'backend',
        prompt: '请基于以上信息，生成后端设计文档，包括系统架构、API设计、服务划分、安全策略等。'
      },
      {
        type: 'database',
        prompt: '请基于以上信息，生成数据库设计文档，包括数据模型、表结构、索引策略、数据关系等。'
      }
    ]

    const documents: Record<string, string> = {}

    // 创建 AI 服务实例
    const aiClient = createAIService(serviceKey, customConfig)

    for (const doc of documentTypes) {
      try {
        const content = await aiClient.generateDocument(contextInfo, doc.prompt)
        documents[doc.type] = content || `# ${doc.type}\n\n生成失败，请稍后重试。`
      } catch (error) {
        documents[doc.type] = `# ${doc.type}\n\n生成失败，请稍后重试。`
      }
    }

    return NextResponse.json({ documents })
  } catch (error) {
    console.error('Error generating documents:', error)
    return NextResponse.json(
      { error: '生成文档失败，请稍后重试' },
      { status: 500 }
    )
  }
}