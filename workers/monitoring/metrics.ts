export function trackMetric(name: string, value: number) {
  await fetch(`https://api.cloudflare.com/client/v4/metrics`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.CF_API_TOKEN}`
    },
    body: JSON.stringify({
      name,
      value,
      timestamp: Date.now()
    })
  })
} 