import { handleAuth } from '../middleware/auth';

const routes = {
  'GET:/api/user': async (request, env, user) => {
    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  },
  
  'POST:/api/auth/login': async (request, env) => {
    const { email, password } = await request.json();
    // ... 登录逻辑
  },
  
  'POST:/api/auth/register': async (request, env) => {
    const { username, email, password } = await request.json();
    // ... 注册逻辑
  }
};

export async function onRequest(context) {
  const { request, env } = context;
  
  // 处理CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  const url = new URL(request.url);
  const routeKey = `${request.method}:${url.pathname}`;
  const handler = routes[routeKey];

  if (!handler) {
    return new Response('Not Found', { status: 404 });
  }

  try {
    // 对于需要认证的路由进行验证
    if (url.pathname.startsWith('/api/') && !url.pathname.startsWith('/api/auth/')) {
      const user = await handleAuth(request, env);
      if (user instanceof Response) {
        return user;
      }
      return await handler(request, env, user);
    }

    return await handler(request, env);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 