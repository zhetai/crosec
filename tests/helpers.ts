import type { Stripe } from 'stripe'

// 创建结账会话
export async function createCheckoutSession(): Promise<{ id: string }> {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [{ id: 'test-product', quantity: 1 }]
    })
  })
  return response.json()
}

// 模拟支付
export async function simulatePayment(sessionId: string): Promise<void> {
  // 模拟 Stripe webhook
  await fetch('/api/webhook/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Stripe-Signature': 'test-signature'
    },
    body: JSON.stringify({
      type: 'checkout.session.completed',
      data: {
        object: {
          id: sessionId,
          payment_status: 'paid'
        }
      }
    })
  })
}

// 验证订单状态
export async function verifyOrderStatus(sessionId: string): Promise<{ status: string }> {
  const response = await fetch(`/api/orders/${sessionId}`)
  return response.json()
} 