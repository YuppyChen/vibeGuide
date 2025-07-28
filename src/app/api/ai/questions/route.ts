import { NextRequest, NextResponse } from 'next/server'
import { createAIService, AI_SERVICES } from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { description, aiService, customConfig } = await request.json()

    if (!description || description.length < 20) {
      return NextResponse.json(
        { error: '项目描述至少需要20个字符' },
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

    // 创建 AI 服务实例
    const aiClient = createAIService(serviceKey, customConfig)
    const content = await aiClient.generateQuestions(description)

    if (!content) {
      throw new Error('No response from AI')
    }

    try {
      const parsedContent = JSON.parse(content)
      return NextResponse.json(parsedContent)
    } catch (parseError) {
      return NextResponse.json({
        questions: [
          { id: '1', question: '谁是这个项目的目标用户？' },
          { id: '2', question: '项目的核心功能有哪些？' },
          { id: '3', question: '预期的用户规模大概是多少？' },
          { id: '4', question: '有什么特殊的技术要求吗？' },
        ]
      })
    }
  } catch (error) {
    console.error('Error generating questions:', error)
    return NextResponse.json(
      { error: '生成问题失败，请稍后重试' },
      { status: 500 }
    )
  }
}