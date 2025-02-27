export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { email, password } = await request.json();

    // 在实际应用中，这里需要进行真实的用户验证
    // 这里仅作示例
    if (email === 'test@example.com' && password === 'password') {
      const token = crypto.randomUUID();
      const userInfo = {
        id: 1,
        email,
        name: 'Test User'
      };

      // 存储用户信息到KV
      await env.USER_KV.put(token, JSON.stringify(userInfo), {
        expirationTtl: 86400 // 24小时
      });

      return new Response(JSON.stringify({
        success: true,
        token
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({
      error: '邮箱或密码错误'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 