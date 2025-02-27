export async function onRequest(context) {
  const { request, env } = context;
  
  // 处理CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      }
    });
  }

  try {
    // 验证token
    const authorization = request.headers.get('Authorization');
    if (!authorization) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 从KV中获取用户信息
    const token = authorization.split(' ')[1];
    const userInfo = await env.USER_KV.get(token);

    if (!userInfo) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 续期token
    await env.USER_KV.put(token, userInfo, { expirationTtl: 86400 });

    return new Response(JSON.stringify({ success: true, data: JSON.parse(userInfo) }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 