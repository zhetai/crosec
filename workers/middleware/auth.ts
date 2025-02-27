export async function authMiddleware(request: Request, env: Env) {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) return new Response('Unauthorized', { status: 401 });

  try {
    const payload = await verifyJWT(token, env.JWT_SECRET);
    request.user = payload;
  } catch (err) {
    return new Response('Invalid token', { status: 403 });
  }
} 