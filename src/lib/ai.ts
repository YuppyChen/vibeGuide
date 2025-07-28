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

export async function generateQuestions(projectDescription: string): Promise<AIQuestion[]> {
  const response = await fetch('/api/ai/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: projectDescription }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate questions')
  }

  const data = await response.json()
  return data.questions
}

export async function generateDocuments(
  projectDescription: string,
  answers: Record<string, string>
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
    body: JSON.stringify({ description: projectDescription, answers }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate documents')
  }

  const data = await response.json()
  return data.documents
}