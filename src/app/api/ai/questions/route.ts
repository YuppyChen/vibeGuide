import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { description } = await request.json()

    if (!description || description.length < 20) {
      return NextResponse.json(
        { error: '项目描述至少需要20个字符' },
        { status: 400 }
      )
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || '',
        'X-Title': 'VibeGuide',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的产品经理和技术架构师。根据用户的项目描述，生成3-5个针对性的问题来深入了解项目需求。

问题应该涵盖：
1. 用户群体和使用场景
2. 核心功能和特性
3. 技术要求和约束
4. 业务逻辑和流程
5. 非功能性需求（性能、安全等）

请以JSON格式返回，格式如下：
{
  "questions": [
    {"id": "1", "question": "问题内容"},
    {"id": "2", "question": "问题内容"}
  ]
}`
          },
          {
            role: 'user',
            content: `项目描述：${description}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

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