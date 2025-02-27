export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { username, email, password } = await request.json();

    // 检查邮箱是否已被注册
    const existingUser = await env.USER_KV.get(`email:${email}`);
    if (existingUser) {
      return new Response(JSON.stringify({
        error: '该邮箱已被注册'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // 创建新用户
    const userId = crypto.randomUUID();
    const token = crypto.randomUUID();
    const userInfo = {
      id: userId,
      username,
      email,
      createdAt: new Date().toISOString()
    };

    // 存储用户信息
    await Promise.all([
      env.USER_KV.put(`user:${userId}`, JSON.stringify(userInfo)),
      env.USER_KV.put(`email:${email}`, userId),
      env.USER_KV.put(token, JSON.stringify(userInfo), {
        expirationTtl: 86400 // 24小时
      })
    ]);

    return new Response(JSON.stringify({
      success: true,
      token
    }), {
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