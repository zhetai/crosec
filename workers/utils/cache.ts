export async function cachedFetch(url: string, env: Env) {
  const cacheKey = `cache:${url}`;
  const cached = await env.KV.get(cacheKey);
  
  if (cached) return new Response(cached);
  
  const response = await fetch(url);
  await env.KV.put(cacheKey, await response.text(), { expirationTtl: 60 });
  return response;
} 