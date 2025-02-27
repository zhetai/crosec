import { handleRequest } from './router'
import { captureWorkerError } from './monitoring/sentry'

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    try {
      // 添加CORS头
      const response = await handleRequest(request, env)
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      return response
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      captureWorkerError(err, {
        request: {
          url: request.url,
          method: request.method,
          headers: Object.fromEntries(request.headers)
        },
        environment: env.ENVIRONMENT
      })
      
      return new Response(JSON.stringify({
        code: 500,
        message: 'Internal Server Error'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
} 