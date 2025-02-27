import { describe, it, expect } from 'vitest'
import { createCheckoutSession, simulatePayment, verifyOrderStatus } from './helpers'

describe('Checkout Flow', () => {
  it('should complete checkout successfully', async () => {
    const session = await createCheckoutSession()
    await simulatePayment(session.id)
    const order = await verifyOrderStatus(session.id)
    expect(order.status).toBe('fulfilled')
  })
}) 