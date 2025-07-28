import OpenAI from 'openai'

export interface AIServiceConfig {
  name: string
  baseURL: string
  apiKey: string
  model: string
  systemPromptPrefix?: string
}

export const AI_SERVICES = {
  openrouter: {
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY || '',
    model: 'anthropic/claude-3.5-sonnet',
    systemPromptPrefix: ''
  },
  moonshot: {
    name: 'Moonshot (Kimi)',
    baseURL: 'https://api.moonshot.cn/v1',
    apiKey: process.env.MOONSHOT_API_KEY || '',
    model: 'kimi-k2-0711-preview',
    systemPromptPrefix: '你是 Kimi，由 Moonshot AI 提供的人工智能助手。'
  }
} as const

export class UniversalAI {
  private client: OpenAI
  private config: AIServiceConfig

  constructor(serviceKey: keyof typeof AI_SERVICES = 'openrouter', customConfig?: Partial<AIServiceConfig>) {
    const baseConfig = AI_SERVICES[serviceKey]
    this.config = { ...baseConfig, ...customConfig }
    
    this.client = new OpenAI({
      apiKey: this.config.apiKey,
      baseURL: this.config.baseURL,
      defaultHeaders: serviceKey === 'openrouter' ? {
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || '',
        'X-Title': 'VibeGuide',
      } : {}
    })
  }

  async generateQuestions(projectDescription: string) {
    const systemContent = `${this.config.systemPromptPrefix}你是一个专业的产品经理和技术架构师。根据用户的项目描述，生成3-5个针对性的问题来深入了解项目需求。

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
}`.trim()

    const completion = await this.client.chat.completions.create({
      model: this.config.model,
      messages: [
        {
          role: "system",
          content: systemContent
        },
        {
          role: "user",
          content: `项目描述：${projectDescription}`
        }
      ],
      temperature: 0.6,
      max_tokens: 1000,
    })

    return completion.choices[0]?.message?.content
  }

  async generateDocument(contextInfo: string, prompt: string) {
    const systemContent = `${this.config.systemPromptPrefix}你是一个专业的产品经理和技术架构师。请基于提供的项目信息生成专业的技术文档，使用markdown格式。`.trim()

    const completion = await this.client.chat.completions.create({
      model: this.config.model,
      messages: [
        {
          role: "system",
          content: systemContent
        },
        {
          role: "user",
          content: `${contextInfo}\n\n${prompt}`
        }
      ],
      temperature: 0.6,
      max_tokens: 2000,
    })

    return completion.choices[0]?.message?.content
  }
}

export function createAIService(serviceKey: keyof typeof AI_SERVICES = 'openrouter', customConfig?: Partial<AIServiceConfig>) {
  return new UniversalAI(serviceKey, customConfig)
}