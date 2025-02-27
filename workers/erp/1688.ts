export async function sync1688Order(orderData: any, env: Env) {
  const response = await fetch('https://api.1688.com/order/create', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${await env.KV.get('1688_TOKEN')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  });

  if (!response.ok) throw new Error('1688 API Error');
  return response.json();
} 