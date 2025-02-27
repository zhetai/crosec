export async function onRequest({ request, env, next }) {
  const response = await next();
  const url = new URL(request.url);
  
  // 确保 JS 和 CSS 文件有正确的 MIME 类型
  if (url.pathname.endsWith('.js')) {
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
    return new Response(response.body, {
      headers: {
        ...Object.fromEntries(response.headers),
        'Content-Type': 'text/css; charset=utf-8'
      },
      status: response.status,
      statusText: response.statusText
    });
  }
  
  return response;
}
