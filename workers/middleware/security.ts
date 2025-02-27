// 增加安全头中间件
export async function securityHeaders(request: Request, env: Env) {
  const response = await next(request, env)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  return response
} 