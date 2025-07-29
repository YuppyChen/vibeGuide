import { NextRequest, NextResponse } from 'next/server'
import { createAIService, AI_SERVICES } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { description, answers, documentType, aiService, customConfig } = await request.json()

    if (!description || !answers || !documentType) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      )
    }

    // 验证服务选择
    const serviceKey = aiService || 'openrouter'
    if (serviceKey !== 'custom' && !AI_SERVICES[serviceKey as keyof typeof AI_SERVICES]) {
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

    const documentPrompts: Record<string, string> = {
      userJourney: '请基于以上信息，生成详细的用户旅程地图，包括用户触点、情感曲线、痛点和机会点。',
      prd: '请基于以上信息，生成完整的产品需求文档(PRD)，包括产品概述、功能需求、非功能需求、用户故事等。',
      frontend: '请基于以上信息，生成前端设计文档，包括技术栈选择、组件架构、状态管理、UI/UX设计规范等。',
      backend: '请基于以上信息，生成后端设计文档，包括系统架构、API设计、服务划分、安全策略等。',
      database: '请基于以上信息，生成数据库设计文档，包括数据模型、表结构、索引策略、数据关系等。'
    }

    const prompt = documentPrompts[documentType]
    if (!prompt) {
      return NextResponse.json(
        { error: '不支持的文档类型' },
        { status: 400 }
      )
    }

    // 创建 AI 服务实例
    const aiClient = createAIService(
      serviceKey === 'custom' ? 'openrouter' : serviceKey, 
      serviceKey === 'custom' ? customConfig : undefined
    )
    
    const content = await aiClient.generateDocument(contextInfo, prompt)

    return NextResponse.json({ 
      documentType,
      content: content || `# ${documentType}\n\n生成失败，请稍后重试。`
    })
  } catch (error) {
    console.error('Error generating document:', error)
    return NextResponse.json(
      { error: '生成文档失败，请稍后重试' },
      { status: 500 }
    )
  }
}