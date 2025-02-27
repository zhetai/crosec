export async function processRefund(paymentId: string, env: Env) {
  const refund = await stripe.refunds.create({
    payment_intent: paymentId
  })
  await updateOrderStatus(paymentId, 'refunded')
  return refund
} 