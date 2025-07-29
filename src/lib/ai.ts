export interface AIQuestion {
  id: string
  question: string
}

export interface AIResponse {
  questions?: AIQuestion[]
  documents?: {
    userJourney?: string
    prd?: string
    frontend?: string
    backend?: string
    database?: string
  }
}

export interface AIServiceOption {
  key: string
  name: string
  baseURL: string
  model: string
}

export interface CustomAIConfig {
  name?: string
  baseURL?: string
  apiKey?: string
  model?: string
}

export const AI_SERVICE_OPTIONS: AIServiceOption[] = [
  {
    key: 'openrouter',
    name: 'OpenRouter',
    baseURL: 'https://openrouter.ai/api/v1',
    model: 'anthropic/claude-3.5-sonnet'
  },
  {
    key: 'moonshot',
    name: 'Moonshot (Kimi)',
    baseURL: 'https://api.moonshot.cn/v1',
    model: 'kimi-k2-0711-preview'
  }
]

export async function generateQuestions(
  projectDescription: string,
  aiService?: string,
  customConfig?: CustomAIConfig
): Promise<AIQuestion[]> {
  const response = await fetch('/api/ai/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      description: projectDescription,
      aiService,
      customConfig 
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate questions')
  }

  const data = await response.json()
  return data.questions
}

export async function generateDocuments(
  projectDescription: string,
  answers: Record<string, string>,
  aiService?: string,
  customConfig?: CustomAIConfig
): Promise<{
  userJourney: string
  prd: string
  frontend: string
  backend: string
  database: string
}> {
  const response = await fetch('/api/ai/documents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      description: projectDescription, 
      answers,
      aiService,
      customConfig 
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate documents')
  }

  const data = await response.json()
  return data.documents
}

export async function generateSingleDocument(
  projectDescription: string,
  answers: Record<string, string>,
  documentType: string,
  aiService?: string,
  customConfig?: CustomAIConfig
): Promise<{ documentType: string; content: string }> {
  const response = await fetch('/api/ai/document', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      description: projectDescription, 
      answers,
      documentType,
      aiService,
      customConfig 
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate document')
  }

  const data = await response.json()
  return data
}