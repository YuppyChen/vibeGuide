# AI 服务配置指南

VibeGuide 现在支持多种 AI 服务，你可以根据需要选择最适合的服务。

## 支持的服务

### 1. OpenRouter
- **描述**: 支持多种 AI 模型的统一接口
- **默认模型**: anthropic/claude-3.5-sonnet
- **特点**: 模型选择丰富，稳定性好
- **配置**: 需要在 `.env.local` 中设置 `OPENROUTER_API_KEY`

### 2. Moonshot (Kimi)
- **描述**: 月之暗面提供的中文优化 AI 服务  
- **默认模型**: kimi-k2-0711-preview
- **特点**: 中文对话能力优秀，更适合中文项目
- **配置**: 需要在 `.env.local` 中设置 `MOONSHOT_API_KEY`

### 3. 自定义服务
- **描述**: 支持任何 OpenAI 兼容的 API 端点
- **特点**: 完全可定制，支持私有部署
- **配置**: 在界面中直接配置 API 密钥、Base URL 和模型名称

## 环境变量配置

在项目根目录的 `.env.local` 文件中添加：

```bash
# OpenRouter 配置
OPENROUTER_API_KEY=your_openrouter_api_key

# Moonshot 配置  
MOONSHOT_API_KEY=your_moonshot_api_key

# 其他配置
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/vibe_guide
```

## 使用方法

1. **创建新项目时选择服务**
   - 在项目创建页面的第一步，你会看到 AI 服务选择器
   - 选择预设的 OpenRouter 或 Moonshot 服务
   - 或者选择"自定义服务"配置你自己的 API 端点

2. **自定义服务配置**
   - 服务名称：给你的自定义服务起个名字
   - API 密钥：你的 API 密钥
   - Base URL：API 端点地址（如：https://api.openai.com/v1）
   - 模型名称：要使用的模型（如：gpt-4, claude-3-sonnet 等）

3. **服务切换**
   - 每个项目创建时都可以独立选择 AI 服务
   - 不同的服务可能产生略有不同的结果风格

## API 兼容性

所有支持的服务都使用 OpenAI 兼容格式，包括：
- Chat Completions API
- 相同的消息格式
- 相同的参数结构

这确保了服务之间的无缝切换和一致的用户体验。

## 故障排除

### 常见问题

1. **API 密钥无效**
   - 确认 API 密钥正确且有效
   - 检查 API 密钥的权限和余额

2. **自定义服务连接失败**
   - 验证 Base URL 格式正确
   - 确认模型名称在目标服务中可用
   - 检查网络连接和防火墙设置

3. **生成内容异常**
   - 不同服务可能有不同的输出风格
   - 可以尝试切换到其他服务进行对比

### 技术支持

如果遇到技术问题，请检查：
1. 浏览器控制台的错误信息
2. 网络请求是否成功
3. API 密钥和配置是否正确