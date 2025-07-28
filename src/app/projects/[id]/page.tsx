'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, FileText, Bot, Calendar, User, Sparkles } from 'lucide-react'

interface Project {
  id: string
  title: string
  description: string
  questions: Array<{ id: string; question: string; answer?: string }>
  answers: Record<string, string>
  documents: {
    userJourney?: string
    prd?: string
    frontend?: string
    backend?: string
    database?: string
  }
  createdAt: string
  updatedAt: string
}

export default function ProjectDetailPage() {
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState<keyof Project['documents']>('userJourney')

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setProject(data.project)
        } else {
          console.error('Project not found')
        }
      } catch (error) {
        console.error('Failed to fetch project:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProject()
    }
  }, [params.id])

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
    if (!project?.documents) return
    
    Object.entries(project.documents).forEach(([key, content]) => {
      if (content) {
        downloadDocument(content, `${key}.md`)
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
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
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">加载项目中...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
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
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              项目不存在
            </h2>
            <p className="text-muted-foreground mb-6">
              请检查项目ID是否正确
            </p>
            <Link href="/projects">
              <Button>返回项目列表</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const documentTabs = [
    { key: 'userJourney', label: '用户旅程地图' },
    { key: 'prd', label: '产品需求PRD' },
    { key: 'frontend', label: '前端设计文档' },
    { key: 'backend', label: '后端设计文档' },
    { key: 'database', label: '数据库设计' },
  ] as const

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* 导航栏 */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-glass-white border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="text-2xl font-display font-bold bg-gradient-brand bg-clip-text text-transparent">
                VibeGuide
              </Link>
            </motion.div>
            <Link href="/projects">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回项目列表
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* 主内容 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 项目标题 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gradient">
                <Sparkles className="w-3 h-3 mr-1" />
                AI生成
              </Badge>
              <Badge variant="outline">
                <FileText className="w-3 h-3 mr-1" />
                文档项目
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-3xl">
              {project.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>创建于 {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>更新于 {new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* 左侧：步骤回顾 */}
            <div className="lg:col-span-1">
              <div className="bg-background border rounded-lg p-6 sticky top-6">
                <h3 className="font-semibold mb-4">项目信息</h3>
                
                {/* 步骤1：项目描述 */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">项目描述</h4>
                  <p className="text-sm">{project.description}</p>
                </div>

                {/* 步骤2：问答 */}
                {project.questions && project.questions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      问答记录 ({project.questions.length}个问题)
                    </h4>
                    <div className="space-y-3">
                      {project.questions.map((question, index) => (
                        <div key={question.id} className="text-xs">
                          <div className="font-medium mb-1">Q{index + 1}: {question.question}</div>
                          <div className="text-muted-foreground">
                            A: {project.answers?.[question.id] || '未回答'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 下载操作 */}
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={downloadAllDocuments}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    批量下载
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      const content = project.documents?.[currentTab]
                      if (content) {
                        downloadDocument(content, `${currentTab}.md`)
                      }
                    }}
                  >
                    下载当前文档
                  </Button>
                </div>
              </div>
            </div>

            {/* 右侧：文档内容 */}
            <div className="lg:col-span-3">
              <div className="bg-background border rounded-lg">
                {/* 文档标签 */}
                <div className="border-b">
                  <nav className="flex space-x-8 px-6">
                    {documentTabs.map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setCurrentTab(key)}
                        className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                          currentTab === key
                            ? 'border-primary text-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* 文档内容 */}
                <div className="p-6">
                  {project.documents?.[currentTab] ? (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-foreground bg-muted/30 rounded-lg p-4 overflow-x-auto leading-relaxed">
                        {project.documents[currentTab]}
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">此文档暂未生成</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}