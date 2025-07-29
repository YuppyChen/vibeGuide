'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { generateQuestions, generateSingleDocument, type CustomAIConfig } from '@/lib/ai'
import { AIServiceSelector } from '@/components/ai-service-selector'

interface AIQuestion {
  id: string
  question: string
  answer?: string
}

export default function NewProjectPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // 步骤1：项目基本信息
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  // AI 服务配置
  const [selectedAIService, setSelectedAIService] = useState('openrouter')
  const [customAIConfig, setCustomAIConfig] = useState<CustomAIConfig>({})
  
  // 步骤2：AI问题
  const [questions, setQuestions] = useState<AIQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  
  // 步骤3：生成的文档
  const [documents, setDocuments] = useState<{
    userJourney?: string
    prd?: string
    frontend?: string
    backend?: string
    database?: string
  }>({})
  const [currentDocumentType, setCurrentDocumentType] = useState('userJourney')
  const [documentGenerationStatus, setDocumentGenerationStatus] = useState<Record<string, 'pending' | 'loading' | 'completed' | 'error'>>({
    userJourney: 'pending',
    prd: 'pending', 
    frontend: 'pending',
    backend: 'pending',
    database: 'pending'
  })

  const handleStep1Next = async () => {
    if (description.length < 20) {
      alert('项目描述至少需要20个字符')
      return
    }

    // 验证自定义配置
    if (selectedAIService === 'custom') {
      if (!customAIConfig.baseURL || !customAIConfig.apiKey || !customAIConfig.model) {
        alert('使用自定义服务时，请填写完整的配置信息')
        return
      }
    }
    
    setLoading(true)
    try {
      const aiQuestions = await generateQuestions(
        description, 
        selectedAIService === 'custom' ? undefined : selectedAIService,
        selectedAIService === 'custom' ? customAIConfig : undefined
      )
      setQuestions(aiQuestions)
      setCurrentStep(2)
    } catch (error) {
      console.error('Failed to generate questions:', error)
      alert('生成问题失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleStep2Next = async () => {
    const allAnswered = questions.every(q => answers[q.id]?.trim())
    if (!allAnswered) {
      alert('请回答所有问题')
      return
    }
    
    setCurrentStep(3)
    // 开始生成第一个文档
    setTimeout(() => generateDocument('userJourney'), 500)
  }

  const generateDocument = async (documentType: string) => {
    setDocumentGenerationStatus(prev => ({
      ...prev,
      [documentType]: 'loading'
    }))
    
    try {
      const result = await generateSingleDocument(
        description,
        answers,
        documentType,
        selectedAIService === 'custom' ? undefined : selectedAIService,
        selectedAIService === 'custom' ? customAIConfig : undefined
      )
      
      setDocuments(prev => ({
        ...prev,
        [documentType]: result.content
      }))
      
      setDocumentGenerationStatus(prev => ({
        ...prev,
        [documentType]: 'completed'
      }))
    } catch (error) {
      console.error(`Failed to generate ${documentType}:`, error)
      setDocumentGenerationStatus(prev => ({
        ...prev,
        [documentType]: 'error'
      }))
    }
  }

  const generateAllDocuments = async () => {
    const documentTypes = ['userJourney', 'prd', 'frontend', 'backend', 'database']
    
    for (const docType of documentTypes) {
      if (documentGenerationStatus[docType] !== 'completed') {
        await generateDocument(docType)
        // 延迟一秒，避免同时发送太多请求
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  const handleSaveProject = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title || `项目 - ${new Date().toLocaleDateString()}`,
          description,
          questions,
          answers,
          documents,
        }),
      })

      if (response.ok) {
        const { project } = await response.json()
        router.push(`/projects/${project.id}`)
      } else {
        throw new Error('Failed to save project')
      }
    } catch (error) {
      console.error('Failed to save project:', error)
      alert('保存项目失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const downloadDocument = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadAllDocuments = () => {
    // 这里应该创建ZIP文件，简化实现
    Object.entries(documents).forEach(([key, content]) => {
      if (content) {
        downloadDocument(content, `${key}.md`)
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              VibeGuide
            </Link>
            <Link href="/projects">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回项目列表
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-2">创建新项目</h1>
            <p className="text-muted-foreground">
              使用AI Agent辅助您完成专业的项目需求分析
            </p>
          </div>

          {/* 步骤条 */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {currentStep > 1 ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <span className="font-medium">描述项目</span>
              </div>
              <div className="w-8 h-0.5 bg-muted"></div>
              <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {currentStep > 2 ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <span className="font-medium">深入需求</span>
              </div>
              <div className="w-8 h-0.5 bg-muted"></div>
              <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {currentStep > 3 ? <Check className="h-4 w-4" /> : '3'}
                </div>
                <span className="font-medium">创建文档</span>
              </div>
            </div>
          </div>

          {/* 步骤内容 */}
          <div className="bg-background border rounded-lg p-8">
            {/* 步骤1：描述项目 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">项目名称（可选）</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="输入项目名称..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    项目描述 <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="详细描述你的项目想法、目标用户、核心功能等..."
                    className="min-h-[200px]"
                  />
                  <div className="text-sm text-muted-foreground mt-2">
                    {description.length}/20 个字符（至少20个字符）
                  </div>
                </div>

                {/* AI 服务选择器 */}
                <AIServiceSelector
                  selectedService={selectedAIService}
                  onServiceChange={setSelectedAIService}
                  customConfig={customAIConfig}
                  onCustomConfigChange={setCustomAIConfig}
                />

                <div className="flex justify-end">
                  <Button 
                    onClick={handleStep1Next}
                    disabled={loading || description.length < 20}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成问题中...
                      </>
                    ) : (
                      <>
                        下一步
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* 步骤2：深入需求 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold mb-2">回答AI生成的问题</h2>
                  <p className="text-muted-foreground">
                    请回答以下问题，帮助AI更好地理解你的项目需求
                  </p>
                </div>
                
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <label className="block text-sm font-medium mb-2">
                        问题 {index + 1}: {question.question}
                      </label>
                      <Textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => setAnswers(prev => ({
                          ...prev,
                          [question.id]: e.target.value
                        }))}
                        placeholder="请详细回答这个问题..."
                        className="min-h-[100px]"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    上一步
                  </Button>
                  <Button 
                    onClick={handleStep2Next}
                    disabled={loading || !questions.every(q => answers[q.id]?.trim())}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        生成文档中...
                      </>
                    ) : (
                      <>
                        生成文档
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* 步骤3：创建文档 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold mb-2">AI 文档生成中</h2>
                  <p className="text-muted-foreground">
                    AI 正在逐份为你生成项目开发文档，请耐心等待
                  </p>
                </div>

                {/* 文档标签切换 */}
                <div className="border-b">
                  <nav className="-mb-px flex space-x-8">
                    {[
                      { key: 'userJourney', label: '用户旅程地图' },
                      { key: 'prd', label: '产品需求PRD' },
                      { key: 'frontend', label: '前端设计文档' },
                      { key: 'backend', label: '后端设计文档' },
                      { key: 'database', label: '数据库设计' },
                    ].map(({ key, label }) => {
                      const status = documentGenerationStatus[key]
                      return (
                        <button
                          key={key}
                          onClick={() => setCurrentDocumentType(key)}
                          className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                            currentDocumentType === key
                              ? 'border-primary text-primary'
                              : 'border-transparent hover:text-primary hover:border-primary'
                          }`}
                        >
                          <span>{label}</span>
                          {status === 'loading' && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          )}
                          {status === 'completed' && (
                            <Check className="h-3 w-3 text-green-500" />
                          )}
                          {status === 'error' && (
                            <span className="h-3 w-3 text-red-500">!</span>
                          )}
                        </button>
                      )
                    })}
                  </nav>
                </div>

                {/* 文档生成按钮 */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-muted-foreground">文档生成</h3>
                    <Button
                      onClick={generateAllDocuments}
                      size="sm"
                      disabled={Object.values(documentGenerationStatus).some(status => status === 'loading')}
                    >
                      {Object.values(documentGenerationStatus).some(status => status === 'loading') ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        '一键生成所有文档'
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'userJourney', label: '用户旅程地图' },
                      { key: 'prd', label: '产品需求PRD' },
                      { key: 'frontend', label: '前端设计文档' },
                      { key: 'backend', label: '后端设计文档' },
                      { key: 'database', label: '数据库设计' },
                    ].map(({ key, label }) => {
                      const status = documentGenerationStatus[key]
                      return (
                        <Button
                          key={key}
                          variant={status === 'completed' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => generateDocument(key)}
                          disabled={status === 'loading'}
                        >
                          {status === 'loading' && (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          )}
                          {status === 'completed' && (
                            <Check className="mr-2 h-3 w-3" />
                          )}
                          {status === 'error' && (
                            <span className="mr-2 text-red-500">重新生成</span>
                          )}
                          {status === 'pending' && '生成'}
                          {status !== 'pending' && status !== 'error' && ''}
                          {label}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* 文档内容预览 */}
                <div className="bg-muted/30 rounded-lg p-6 max-h-96 overflow-y-auto">
                  {documentGenerationStatus[currentDocumentType] === 'loading' ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">正在生成文档...</p>
                      </div>
                    </div>
                  ) : documentGenerationStatus[currentDocumentType] === 'error' ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <p className="text-red-500 mb-4">文档生成失败</p>
                        <Button onClick={() => generateDocument(currentDocumentType)}>
                          重新生成
                        </Button>
                      </div>
                    </div>
                  ) : documents[currentDocumentType as keyof typeof documents] ? (
                    <pre className="whitespace-pre-wrap text-sm">
                      {documents[currentDocumentType as keyof typeof documents]}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">点击上方按钮生成文档</p>
                        <Button onClick={() => generateDocument(currentDocumentType)}>
                          生成文档
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 操作按钮 */}
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" onClick={downloadAllDocuments}>
                      批量下载
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => downloadDocument(documents[currentDocumentType as keyof typeof documents] || '', `${currentDocumentType}.md`)}
                      disabled={!documents[currentDocumentType as keyof typeof documents]}
                    >
                      下载当前文档
                    </Button>
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      上一步
                    </Button>
                    <Button 
                      onClick={handleSaveProject}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          保存中...
                        </>
                      ) : (
                        '保存项目'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}