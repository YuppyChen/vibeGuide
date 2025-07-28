import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 基础色彩系统
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(262 83% 58%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(224 71% 4%)",
        
        // 品牌主色 - 紫蓝渐变
        primary: {
          50: "hsl(248 100% 97%)",
          100: "hsl(245 100% 95%)",
          200: "hsl(243 96% 91%)",
          300: "hsl(242 89% 84%)",
          400: "hsl(240 82% 76%)",
          500: "hsl(238 75% 65%)", // 主色
          600: "hsl(235 69% 58%)",
          700: "hsl(232 57% 50%)",
          800: "hsl(230 45% 42%)",
          900: "hsl(228 39% 35%)",
          DEFAULT: "hsl(238 75% 65%)",
          foreground: "hsl(0 0% 98%)",
        },
        
        // 辅助色 - 青色
        accent: {
          50: "hsl(178 92% 95%)",
          100: "hsl(176 85% 90%)",
          200: "hsl(175 80% 80%)",
          300: "hsl(174 73% 68%)",
          400: "hsl(172 66% 55%)",
          500: "hsl(170 60% 42%)", // 青色主色
          600: "hsl(168 56% 35%)",
          700: "hsl(166 50% 28%)",
          800: "hsl(164 45% 23%)",
          900: "hsl(162 40% 18%)",
          DEFAULT: "hsl(170 60% 42%)",
          foreground: "hsl(0 0% 98%)",
        },
        
        // 警告色 - 温暖橙色
        warning: {
          50: "hsl(48 100% 96%)",
          100: "hsl(48 96% 89%)",
          200: "hsl(48 97% 77%)",
          300: "hsl(46 96% 64%)",
          400: "hsl(43 96% 56%)",
          500: "hsl(38 92% 50%)",
          600: "hsl(32 95% 44%)",
          700: "hsl(26 90% 37%)",
          800: "hsl(22 82% 31%)",
          900: "hsl(21 77% 26%)",
          DEFAULT: "hsl(38 92% 50%)",
          foreground: "hsl(0 0% 98%)",
        },
        
        // 成功色 - 翠绿
        success: {
          50: "hsl(138 76% 97%)",
          100: "hsl(141 84% 93%)",
          200: "hsl(141 79% 85%)",
          300: "hsl(142 77% 73%)",
          400: "hsl(142 69% 58%)",
          500: "hsl(142 71% 45%)",
          600: "hsl(142 76% 36%)",
          700: "hsl(142 72% 29%)",
          800: "hsl(143 64% 24%)",
          900: "hsl(144 61% 20%)",
          DEFAULT: "hsl(142 71% 45%)",
          foreground: "hsl(0 0% 98%)",
        },
        
        secondary: {
          DEFAULT: "hsl(220 14% 96%)",
          foreground: "hsl(220 9% 46%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(220 14% 96%)",
          foreground: "hsl(220 9% 46%)",
        },
        
        // 玻璃态效果
        glass: {
          white: "hsla(0, 0%, 100%, 0.8)",
          dark: "hsla(224, 71%, 4%, 0.8)",
        }
      },
      
      // 渐变色
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-brand': 'linear-gradient(135deg, hsl(238 75% 65%) 0%, hsl(235 69% 58%) 100%)',
        'gradient-accent': 'linear-gradient(135deg, hsl(170 60% 42%) 0%, hsl(174 73% 68%) 100%)',
        'gradient-hero': 'linear-gradient(135deg, hsl(248 100% 97%) 0%, hsl(178 92% 95%) 100%)',
      },
      
      // 阴影系统
      boxShadow: {
        'soft': '0 2px 8px 0 rgb(0 0 0 / 0.08)',
        'medium': '0 4px 16px 0 rgb(0 0 0 / 0.12)',
        'large': '0 8px 32px 0 rgb(0 0 0 / 0.16)',
        'brand': '0 8px 32px 0 hsl(238 75% 65% / 0.3)',
        'glass': '0 8px 32px 0 rgb(31 38 135 / 0.37)',
      },
      
      // 动画
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // 字体
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      
      // 边框半径
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      // 背景模糊
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config