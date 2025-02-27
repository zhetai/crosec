interface CustomsConfig {
  rateKey: string
  vatRate: number
  restrictionCodes: string[]
}

export async function getCustomsConfig(region: string, env: Env): Promise<CustomsConfig> {
  const config = await env.KV.get(`CUSTOMS_CONFIG_${region}`, 'json')
  return config || {
    rateKey: 'DEFAULT_RATE',
    vatRate: 0.2,
    restrictionCodes: []
  }
}

export async function calculateDuty(
  region: string,
  price: number,
  env: Env
): Promise<number> {
  const { rateKey, vatRate } = await getCustomsConfig(region, env)
  const baseRate = await env.KV.get(rateKey, 'json') || 0.1
  return price * (baseRate + vatRate)
}

export async function checkRestrictions(
  region: string, 
  productCode: string,
  env: Env
): Promise<boolean> {
  const { restrictionCodes } = await getCustomsConfig(region, env)
  return !restrictionCodes.includes(productCode)
}

interface CustomsStrategy {
  calculateDuty(price: number, category: string): Promise<number>
  checkRestrictions(productCode: string): Promise<boolean>
}

// 策略实现示例
const EUCustoms: CustomsStrategy = {
  async calculateDuty(price, category) {
    const baseRate = await env.KV.get(`CUSTOMS_EU_${category}_RATE`)
    return price * (parseFloat(baseRate || '0.2') + 0.1) // VAT 21%
  },
  // ...其他方法实现
}

const strategies: Record<Region, CustomsStrategy> = {
  'EU': EUCustoms,
  'NORTH_AMERICA': NorthAmericaCustoms,
  // 其他地区策略...
}

export async function handleCustomsClearance(
  region: Region,
  product: Product,
  env: Env
) {
  const strategy = strategies[region]
  if (!strategy) throw new Error('Unsupported region')
  
  return {
    duty: await strategy.calculateDuty(product.price, product.category),
    isAllowed: await strategy.checkRestrictions(product.code)
  }
} 