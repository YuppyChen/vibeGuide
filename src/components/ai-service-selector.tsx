'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AI_SERVICE_OPTIONS, type CustomAIConfig } from '@/lib/ai'
import { Settings, Check } from 'lucide-react'

interface AIServiceSelectorProps {
  selectedService: string
  onServiceChange: (service: string) => void
  customConfig: CustomAIConfig
  onCustomConfigChange: (config: CustomAIConfig) => void
}

export function AIServiceSelector({
  selectedService,
  onServiceChange,
  customConfig,
  onCustomConfigChange,
}: AIServiceSelectorProps) {
  const [showCustomConfig, setShowCustomConfig] = useState(false)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-3">选择 AI 服务</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {AI_SERVICE_OPTIONS.map((service) => (
            <Card
              key={service.key}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedService === service.key
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onServiceChange(service.key)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{service.name}</h3>
                    {selectedService === service.key && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    模型: {service.model}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {service.baseURL}
                  </p>
                </div>
              </div>
            </Card>
          ))}
          
          {/* 自定义服务选项 */}
          <Card
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedService === 'custom'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => {
              onServiceChange('custom')
              setShowCustomConfig(true)
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <h3 className="font-medium">自定义服务</h3>
                  {selectedService === 'custom' && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  配置你自己的 AI 服务端点
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 自定义配置面板 */}
      {(selectedService === 'custom' || showCustomConfig) && (
        <Card className="p-4 bg-muted/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">自定义 AI 服务配置</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustomConfig(!showCustomConfig)}
              >
                {showCustomConfig ? '收起' : '展开'}
              </Button>
            </div>
            
            {showCustomConfig && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">服务名称</label>
                  <Input
                    value={customConfig.name || ''}
                    onChange={(e) => onCustomConfigChange({
                      ...customConfig,
                      name: e.target.value
                    })}
                    placeholder="自定义服务名称"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">API 密钥</label>
                  <Input
                    type="password"
                    value={customConfig.apiKey || ''}
                    onChange={(e) => onCustomConfigChange({
                      ...customConfig,
                      apiKey: e.target.value
                    })}
                    placeholder="输入 API 密钥"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Base URL</label>
                  <Input
                    value={customConfig.baseURL || ''}
                    onChange={(e) => onCustomConfigChange({
                      ...customConfig,
                      baseURL: e.target.value
                    })}
                    placeholder="https://api.example.com/v1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">模型名称</label>
                  <Input
                    value={customConfig.model || ''}
                    onChange={(e) => onCustomConfigChange({
                      ...customConfig,
                      model: e.target.value
                    })}
                    placeholder="gpt-4 或其他模型名称"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 服务状态说明 */}
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>OpenRouter:</strong> 支持多种模型，需要 OpenRouter API 密钥
        </p>
        <p>
          <strong>Moonshot (Kimi):</strong> 中文对话优化，需要月之暗面 API 密钥
        </p>
        <p>
          <strong>自定义服务:</strong> 支持 OpenAI 兼容的任何 API 端点
        </p>
      </div>
    </div>
  )
}