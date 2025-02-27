// 微信支付回调验证示例
export async function verifyWechatPayment(sign: string, data: any, env: Env) {
  const key = await env.KV.get('WECHAT_PAY_KEY')
  const signLocal = createHash('sha256')
    .update(JSON.stringify(data) + key)
    .digest('hex')
  return sign === signLocal
} 