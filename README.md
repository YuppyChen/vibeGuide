# VibeGuide - AI开发文档平台

🚀 智能AI开发文档平台，通过AI对话快速生成项目开发文档

## ✨ 功能特性

- 📝 **智能问题生成**：根据项目描述自动生成针对性问题
- 🤖 **多AI服务支持**：支持 OpenRouter(Claude) 和 Moonshot(Kimi) 等多个AI服务
- 📋 **多类型文档生成**：自动生成用户旅程、PRD、前端、后端、数据库等5种文档
- 🔧 **自定义AI配置**：支持自定义AI服务配置
- 💾 **项目管理**：保存和管理多个项目的文档生成记录

## 🛠 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS + Radix UI
- **数据库**: PostgreSQL + Drizzle ORM
- **AI集成**: OpenAI SDK (支持多个AI服务)
- **包管理**: PNPM

## 🚀 快速开始

### 环境要求

- Node.js 18+
- PNPM
- PostgreSQL 12+

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd vibeGuide
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 环境配置

复制环境变量模板并配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```env
# 数据库配置
DATABASE_URL=postgresql://localhost:5432/vibe_guide

# AI服务API密钥 (至少配置一个)
OPENROUTER_API_KEY=your_openrouter_api_key
MOONSHOT_API_KEY=your_moonshot_api_key

# 应用配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. 数据库设置

```bash
# 创建数据库
createdb vibe_guide

# 生成并推送数据库schema
pnpm db:generate
pnpm db:push
```

### 5. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 开始使用！

## 📋 可用命令

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器
pnpm lint         # 代码检查

# 数据库
pnpm db:generate  # 生成数据库迁移文件
pnpm db:push      # 推送schema变更到数据库
```

## 🔑 AI服务配置

### OpenRouter (Claude)

1. 注册 [OpenRouter](https://openrouter.ai/) 账号
2. 获取API密钥
3. 设置 `OPENROUTER_API_KEY` 环境变量

### Moonshot (Kimi)

1. 注册 [Moonshot](https://kimi.moonshot.cn/) 账号
2. 获取API密钥
3. 设置 `MOONSHOT_API_KEY` 环境变量

### 自定义AI服务

项目支持在界面中配置自定义AI服务，只需提供：
- 服务名称
- Base URL
- API密钥
- 模型名称

## 📖 使用流程

1. **创建项目**：输入项目标题和详细描述
2. **选择AI服务**：选择或配置AI服务
3. **生成问题**：AI根据项目描述生成针对性问题
4. **回答问题**：回答生成的问题以提供更多项目细节
5. **生成文档**：一键生成5种类型的开发文档
6. **下载文档**：支持下载生成的文档

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   ├── projects/          # 项目相关页面
│   └── layout.tsx         # 根布局
├── components/            # 可复用组件
│   ├── ui/               # UI基础组件
│   └── ai-service-selector.tsx
├── lib/                   # 核心业务逻辑
│   ├── db/               # 数据库相关
│   ├── ai.ts             # AI客户端函数
│   ├── ai-service.ts     # AI服务工厂
│   └── utils.ts          # 工具函数
└── types/                # TypeScript类型定义
```

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

ISC License