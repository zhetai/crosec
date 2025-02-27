export interface Env {
  // 定义您的环境变量类型
  KV: KVNamespace;
  DB: D1Database;
  ENVIRONMENT: string;
  SENTRY_DSN: string;
  CUSTOMS_API_KEY: string;
  OPEN_EXCHANGE_RATES_KEY: string;
  STRIPE_SECRET_KEY: string;
  WECHAT_MCH_ID: string;
  ALIPAY_APP_ID: string;
  ERP_1688_TOKEN: string;
  DEFAULT_CURRENCY: string;
} 