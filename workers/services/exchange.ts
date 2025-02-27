interface ExchangeRateProvider {
  getRate(from: string, to: string): Promise<number>
}

// 使用公开API的示例实现
class OpenExchangeRates implements ExchangeRateProvider {
  constructor(private apiKey: string) {}

  async getRate(from: string, to: string): Promise<number> {
    const url = `https://openexchangerates.org/api/latest.json?app_id=${this.apiKey}`
    const response = await fetch(url)
    const data = await response.json()
    return data.rates[to] / data.rates[from]
  }
}

// 使用环境变量配置
export async function fetchExchangeRate(from: string, to: string, env: Env): Promise<number> {
  const apiKey = env.OPEN_EXCHANGE_RATES_KEY
  const url = `https://openexchangerates.org/api/latest.json?app_id=${apiKey}&base=${from}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data.rates[to]
  } catch (error) {
    console.error('汇率获取失败:', error)
    throw new Error('Failed to fetch exchange rate')
  }
} 