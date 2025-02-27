import Stripe from 'stripe'

export async function createStripeSession(request: Request, env: Env) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Product Name' },
        unit_amount: 1999,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${env.BASE_URL}/success`,
    cancel_url: `${env.BASE_URL}/cancel`,
  });

  return new Response(JSON.stringify({ id: session.id }), {
    headers: { 'Content-Type': 'application/json' }
  });
} 