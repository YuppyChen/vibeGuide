import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { description, answers } = await request.json()

    if (!description || !answers) {
      return NextResponse.json(
        { error: '缺少必要参数' },
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

    for (const doc of documentTypes) {
      try {
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
                content: '你是一个专业的产品经理和技术架构师。请基于提供的项目信息生成专业的技术文档，使用markdown格式。'
              },
              {
                role: 'user',
                content: `${contextInfo}\n\n${doc.prompt}`
              }
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          documents[doc.type] = data.choices[0]?.message?.content || `# ${doc.type}\n\n生成失败，请稍后重试。`
        } else {
          documents[doc.type] = `# ${doc.type}\n\n生成失败，请稍后重试。`
        }
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