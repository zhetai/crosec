export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理静态资源请求
    if (url.pathname.endsWith('.js')) {
      const response = await env.ASSETS.fetch(request);
      return new Response(response.body, {
        headers: {
          ...Object.fromEntries(response.headers),
          'Content-Type': 'application/javascript; charset=utf-8'
        },
        status: response.status,
        statusText: response.statusText
      });
    }
    
    if (url.pathname.endsWith('.css')) {
      const response = await env.ASSETS.fetch(request);
      return new Response(response.body, {
        headers: {
          ...Object.fromEntries(response.headers),
          'Content-Type': 'text/css; charset=utf-8'
        },
        status: response.status,
        statusText: response.statusText
      });
    }
    
    // 对于其他请求，正常处理
    return env.ASSETS.fetch(request);
  }
}; 