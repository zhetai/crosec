import { fetchExchangeRate } from '../services/exchange'

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount)
}

// 汇率转换（需接入实时API）
export async function convertCurrency(
  amount: number,
  from: string,
  to: string,
  env: Env
) {
  const rateKey = `exrate_${from}_${to}`
  const cachedRate = await env.KV.get(rateKey)
  
  if (cachedRate) {
    return amount * parseFloat(cachedRate)
  }
  
  const newRate = await fetchExchangeRate(from, to, env)
  await env.KV.put(rateKey, newRate.toString(), { expirationTtl: 3600 })
  
  return amount * newRate
} 