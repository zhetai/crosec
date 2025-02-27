/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/cloudflare" />
// 全局类型声明
declare global {
  interface Env {
    // 环境类型
    ENVIRONMENT: 'development' | 'production'
    
    // 数据库
    DB: D1Database
    
    // KV存储
    KV: KVNamespace
    
    // 支付相关
    STRIPE_SECRET_KEY: string
    WECHAT_MCH_ID: string
    ALIPAY_APP_ID: string
    
    // 1688 ERP
    ERP_1688_TOKEN: string
    
    // 网站基础配置
    BASE_URL: string
    DEFAULT_CURRENCY: 'USD' | 'CNY'
    
    // 汇率相关
    OPEN_EXCHANGE_RATES_KEY: string
  }
}

// Vue组件类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 显式导出空对象使文件成为模块
export {} 