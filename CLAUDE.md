# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Database operations
pnpm db:generate  # Generate Drizzle schema migrations
pnpm db:push      # Push schema changes to database
```

## Project Architecture

VibeGuide 是一个智能AI开发文档平台，帮助用户通过AI对话生成项目开发文档。

### Core Architecture
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: 支持多个AI服务 (OpenRouter/Claude, Moonshot/Kimi)
- **UI**: React 19 + Tailwind CSS + Radix UI components
- **Package Manager**: PNPM

### Key Directories
- `src/app/`: Next.js App Router pages and API routes
- `src/lib/`: Core business logic and utilities
  - `ai.ts`: AI service client functions
  - `ai-service.ts`: AI service factory and implementations
  - `db/`: Database schema and connection
- `src/components/`: Reusable UI components
- `docs/`: Documentation and AI service configuration guides

### Database Schema
单表设计在 `src/lib/db/schema.ts`:
- `projects` table: 存储项目信息、问题、答案和生成的文档

### AI Service Integration
项目支持多个AI服务，通过 `src/lib/ai-service.ts` 统一管理:
- OpenRouter (Claude): 默认服务
- Moonshot (Kimi): 国内服务
- 支持自定义配置 (baseURL, apiKey, model)

### API Endpoints
- `/api/ai/questions`: 根据项目描述生成问题
- `/api/ai/documents`: 批量生成所有文档类型
- `/api/ai/document`: 生成单个文档类型
- `/api/projects`: 项目CRUD操作

### Document Types
系统支持生成5种文档类型:
- userJourney: 用户旅程文档
- prd: 产品需求文档
- frontend: 前端技术文档
- backend: 后端技术文档
- database: 数据库设计文档

### State Management
使用 React 原生状态管理，主要通过:
- `useState` for component state
- Form state with `react-hook-form`
- Database state through API calls

### UI Components
基于 Radix UI 构建的可复用组件在 `src/components/ui/`，包括:
- Button, Card, Input, Textarea 等基础组件
- `ai-service-selector.tsx`: AI服务选择器
- `loading.tsx`: 加载状态组件