'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, FileText, Code, Database, Users, ArrowRight, CheckCircle, Sparkles, Bot, Rocket } from 'lucide-react'

export default function HomePage() {
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
              <span className="text-2xl font-display font-bold bg-gradient-brand bg-clip-text text-transparent">
                VibeGuide
              </span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">首页</Button>
              </Link>
              <Badge variant="gradient" className="hidden sm:inline-flex">
                <Sparkles className="w-3 h-3 mr-1" />
                AI驱动
              </Badge>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero 区域 */}
      <section className="relative py-24 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <g fill="#9C92AC" fillOpacity="0.03">
                  <circle cx="30" cy="30" r="2"/>
                </g>
              </g>
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="gradient" className="mb-6 shadow-lg">
              <Rocket className="w-3 h-3 mr-1" />
              全新AI文档平台
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                智能AI
              </span>
              <br />
              <span className="text-foreground">开发文档平台</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              让AI助手帮你快速生成完整的项目开发文档
              <br />
              <span className="text-primary-600 font-medium">从用户旅程到技术架构，一站式解决方案</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/projects">
                <Button size="xl" className="w-full sm:w-auto shadow-brand">
                  <Sparkles className="mr-2 h-5 w-5" />
                  立即开始创作
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                <FileText className="mr-2 h-5 w-5" />
                查看示例
              </Button>
            </div>

            {/* 特色数据 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-muted-foreground">专业文档类型</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-accent-600 mb-2">3</div>
                <div className="text-muted-foreground">简单步骤完成</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-success-600 mb-2">AI</div>
                <div className="text-muted-foreground">Claude驱动</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features 区域 */}
      <section className="py-24 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              核心功能
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              为什么选择
              <span className="bg-gradient-brand bg-clip-text text-transparent"> VibeGuide</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              专业级AI文档生成，让你的项目文档制作效率提升10倍
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "AI驱动生成",
                description: "基于Claude Sonnet-4强大AI能力，智能分析项目需求，生成专业文档",
                color: "primary",
                delay: 0.1
              },
              {
                icon: FileText,
                title: "全套文档",
                description: "一次生成5类核心文档：用户旅程、PRD、前端、后端、数据库设计",
                color: "accent",
                delay: 0.2
              },
              {
                icon: Users,
                title: "三步创建",
                description: "简单三步即可完成：描述项目 → 深入需求 → 生成文档",
                color: "success",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay }}
                whileHover={{ y: -5 }}
              >
                <Card variant="hover" className="h-full text-center p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grids 功能展示 */}
      <section className="py-24 bg-gradient-to-b from-background to-primary-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              <FileText className="w-3 h-3 mr-1" />
              文档类型
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              一站式文档
              <span className="bg-gradient-accent bg-clip-text text-transparent">解决方案</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {/* 前端设计文档 - 大卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-3 lg:col-span-4 md:row-span-2"
            >
              <Card variant="glass" className="h-full p-8 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="gradient">热门</Badge>
                </div>
                <h3 className="text-xl font-bold mb-3">前端设计文档</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  技术栈选择、组件架构、状态管理、UI/UX设计规范，完整的前端开发指南
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">React</Badge>
                  <Badge variant="secondary" className="text-xs">Vue</Badge>
                  <Badge variant="secondary" className="text-xs">UI/UX</Badge>
                </div>
              </Card>
            </motion.div>

            {/* 数据库设计 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-3 lg:col-span-2"
            >
              <Card variant="hover" className="h-full p-6 bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
                <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold mb-2">数据库设计</h3>
                <p className="text-sm text-muted-foreground">
                  数据模型、表结构、索引策略
                </p>
              </Card>
            </motion.div>

            {/* 产品需求 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-3 lg:col-span-2"
            >
              <Card variant="hover" className="h-full p-6 bg-gradient-to-br from-success-50 to-success-100 border-success-200">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-success-500 to-success-600 flex items-center justify-center mb-4">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold mb-2">产品需求</h3>
                <p className="text-sm text-muted-foreground">
                  完整PRD文档，功能需求梳理
                </p>
              </Card>
            </motion.div>

            {/* 用户旅程 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 lg:col-span-2"
            >
              <Card variant="hover" className="h-full p-6 bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-warning-500 to-warning-600 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold mb-2">用户旅程</h3>
                <p className="text-sm text-muted-foreground">
                  用户触点、情感曲线分析
                </p>
              </Card>
            </motion.div>

            {/* 后端架构设计 - 大卡片 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="md:col-span-4 lg:col-span-4"
            >
              <Card variant="glass" className="h-full p-8 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">后端架构设计</h3>
                <p className="text-muted-foreground mb-4">
                  系统架构、API设计、服务划分、安全策略等完整后端技术方案
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">微服务</Badge>
                  <Badge variant="outline" className="text-xs">API设计</Badge>
                  <Badge variant="outline" className="text-xs">安全策略</Badge>
                  <Badge variant="outline" className="text-xs">数据库</Badge>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="py-24 bg-gradient-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <svg className="w-full h-full" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <g fill="#ffffff" fillOpacity="0.05">
                <circle cx="30" cy="30" r="1"/>
              </g>
            </g>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="glass" className="mb-6 text-white border-white/20">
              <Rocket className="w-3 h-3 mr-1" />
              开始创作
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
              开始你的项目文档之旅
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto text-white leading-relaxed">
              无需复杂设置，只需描述你的项目想法
              <br />
              AI将为你生成专业完整的开发文档
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/projects">
                <Button size="xl" variant="glass" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  立即开始创作
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                查看案例
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ 区域 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              <CheckCircle className="w-3 h-3 mr-1" />
              常见问题
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              还有疑问？
            </h2>
            <p className="text-xl text-muted-foreground">
              这里是用户最常问的问题
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                question: "生成的文档质量如何？",
                answer: "基于Claude Sonnet-4模型，结合专业的产品和技术模板，生成符合行业标准的高质量文档。",
                delay: 0.1
              },
              {
                question: "支持哪些类型的项目？", 
                answer: "支持Web应用、移动应用、API服务、数据平台等各类软件项目的文档生成。",
                delay: 0.2
              },
              {
                question: "可以下载和编辑文档吗？",
                answer: "所有文档支持Markdown格式预览和下载，可以进一步编辑和定制。",
                delay: 0.3
              },
              {
                question: "文档生成需要多长时间？",
                answer: "通常在2-3分钟内即可生成完整的5类文档，具体时间取决于项目复杂度。",
                delay: 0.4
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: faq.delay }}
              >
                <Card variant="hover" className="p-8 h-full">
                  <div className="flex items-start mb-4">
                    <div className="w-8 h-8 rounded-full bg-success-100 flex items-center justify-center flex-shrink-0 mr-3">
                      <CheckCircle className="h-4 w-4 text-success-600" />
                    </div>
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-11">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-brand rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold">VibeGuide</span>
            </div>
            
            <p className="text-slate-300 mb-8 max-w-md">
              智能AI开发文档平台，让文档创作变得简单高效
            </p>
            
            <div className="flex items-center space-x-6 mb-8">
              <Badge variant="glass" className="text-white border-white/20">
                <Sparkles className="w-3 h-3 mr-1" />
                AI驱动
              </Badge>
              <Badge variant="glass" className="text-white border-white/20">
                <Zap className="w-3 h-3 mr-1" />
                高效便捷
              </Badge>
              <Badge variant="glass" className="text-white border-white/20">
                <FileText className="w-3 h-3 mr-1" />
                专业文档
              </Badge>
            </div>
            
            <div className="border-t border-slate-700 pt-8 w-full">
              <p className="text-slate-400 text-sm">
                © 2024 VibeGuide. 智能AI开发文档平台. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}