# VibeGuide 简化版产品需求文档

## 产品概述
VibeGuide 是一个智能AI开发文档平台，能够帮助用户快速生成项目的一系列开发文档，包括：
- 用户旅程地图
- 产品需求PRD
- 前端设计文档
- 后端设计文档
- 数据库设计

## 页面结构

### 首页 (/)
简约风格的落地页，要求：
1. 顶部导航栏只有首页链接
2. 包含以下组件：
   - Hero区域：突出AI开发文档平台特色
   - Features：产品功能特色展示
   - Bento Grids：功能网格展示
   - CTA：行动号召，点击【立即开始】直接跳转到 `/projects` 页面
   - FAQ：常见问题解答
3. 使用合适的开源无版权图片

### 项目管理页面 (/projects)
项目列表页面，要求：
1. 页面标题：我的项目
2. 显示用户创建过的项目卡片列表
3. 点击项目卡片可访问 `/projects/:id` 查看详情
4. 右上角有【新建项目】按钮，点击跳转到 `/projects/new`

### 新建项目页面 (/projects/new)
三步骤项目创建流程：

**页面标题**：创建新项目  
**副标题**：使用AI Agent辅助您完成专业的项目需求分析

**步骤条**：描述项目 → 深入需求 → 创建文档

1. **描述项目**
   - 提供文本框让用户详细描述项目
   - 至少输入20个字符才能进入下一步

2. **深入需求**
   - 根据用户项目描述调用AI接口
   - AI生成3-5个针对性问题
   - 用户在对话框中回答所有问题后可进入下一步

3. **创建文档**
   - 批量生成5类开发文档：用户旅程地图、产品需求PRD、前端设计文档、后端设计文档、数据库设计
   - 使用Tabs组件切换不同文档
   - 文档以markdown格式显示，支持预览HTML格式
   - 支持单个文档下载和批量ZIP下载
   - 提供【保存项目】按钮，保存所有步骤内容到数据库

### 项目详情页面 (/projects/:id)
与 `/projects/new` 页面UI完全一致，通过数据库数据回显三个步骤的内容。

## 技术实现

### 前端技术栈
- **Next.js 15** with App Router
- **TypeScript**
- **TailwindCSS + Shadcn/UI** 现代简约样式
- **React Hook Form** 表单处理

### 数据库
- **本地 PostgreSQL 数据库**
- **Drizzle ORM** 进行数据库操作
- 自动创建和同步数据库表结构

### 数据库表设计
```sql
-- 项目表
projects (
  id: string (primary key)
  title: string
  description: string
  questions: jsonb -- AI生成的问题
  answers: jsonb -- 用户的回答
  documents: jsonb -- 生成的文档内容
  created_at: timestamp
  updated_at: timestamp
)
```

### AI集成
- 使用 **Claude Sonnet-4** 模型
- 通过 **OpenRouter API** 调用
- 实现问题生成和文档生成功能

### 环境变量
```env

# AI服务
OPENROUTER_API_KEY=your_openrouter_api_key

# 应用配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 开发命令
- `pnpm run dev` - 启动开发服务器
- `pnpm run build` - 构建生产版本
- `pnpm run start` - 启动生产服务器
- `pnpm run lint` - 代码检查
- `pnpm run db:generate` - 生成数据库迁移文件
- `pnpm run db:push` - 推送数据库结构更改


## 核心功能保留
✅ AI驱动的项目文档生成  
✅ 三步骤项目创建流程  
✅ 项目保存和管理  
✅ 文档预览和下载  
✅ 响应式设计  