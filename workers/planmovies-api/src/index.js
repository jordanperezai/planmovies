export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const route = `${request.method} ${url.pathname}`;

      switch (true) {
        case route === 'POST /api/connect/create-account':
          return json(await createConnectedAccount(env, await request.json()), corsHeaders);

        case route === 'GET /api/connect/complete':
          return handleConnectReturn(url, env);

        case route === 'POST /api/events/create':
          return json(await createEvent(env, await request.json()), corsHeaders);

        case route === 'GET /api/events/payment-link':
          return json(await getPaymentLink(env, url.searchParams.get('slug')), corsHeaders);

        case route === 'POST /api/webhooks/stripe':
          return await handleStripeWebhook(request, env);

        case route === 'GET /api/health':
          return json({ status: 'ok', timestamp: new Date().toISOString() }, corsHeaders);

        default:
          return json({ error: 'Not found' }, corsHeaders, 404);
      }
    } catch (err) {
      console.error('API error:', err.message, err.stack);
      return json({ error: err.message }, corsHeaders, 500);
    }
  },
};

function json(data, corsHeaders, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

// --- STRIPE HELPERS ---

async function stripeAPI(env, method, path, body, connectedAccountId) {
  const headers = {
    'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  if (connectedAccountId) {
    headers['Stripe-Account'] = connectedAccountId;
  }

  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers,
    body: body ? new URLSearchParams(body).toString() : undefined,
  });

  const data = await res.json();
  if (data.error) throw new Error(`Stripe: ${data.error.message}`);
  return data;
}

// --- SUPABASE HELPERS ---

async function supabaseQuery(env, method, table, body, filters) {
  const url = new URL(`${env.SUPABASE_URL}/rest/v1/${table}`);
  if (filters) {
    Object.entries(filters).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const headers = {
    'apikey': env.SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': method === 'POST' ? 'return=representation' : 'return=representation',
  };

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${method} ${table}: ${text}`);
  }

  return res.json();
}

// --- CONNECT: CREATE ACCOUNT ---

async function createConnectedAccount(env, { name, email }) {
  if (!name || !email) throw new Error('name and email required');

  const account = await stripeAPI(env, 'POST', '/accounts', {
    type: 'express',
    country: 'US',
    email,
    'capabilities[transfers][requested]': 'true',
    'capabilities[card_payments][requested]': 'true',
    'business_type': 'individual',
    'individual[first_name]': name.split(' ')[0],
    'individual[last_name]': name.split(' ').slice(1).join(' ') || name,
  });

  const [organizer] = await supabaseQuery(env, 'POST', 'organizers', {
    name,
    email,
    stripe_account_id: account.id,
    stripe_onboarding_complete: false,
  });

  const accountLink = await stripeAPI(env, 'POST', '/account_links', {
    account: account.id,
    refresh_url: `https://planmovies.com/api/connect/complete?account_id=${account.id}&refresh=1`,
    return_url: `https://planmovies.com/api/connect/complete?account_id=${account.id}`,
    type: 'account_onboarding',
  });

  return {
    organizer_id: organizer.id,
    stripe_account_id: account.id,
    onboarding_url: accountLink.url,
  };
}

// --- CONNECT: HANDLE RETURN ---

function handleConnectReturn(url, env) {
  const accountId = url.searchParams.get('account_id');
  const isRefresh = url.searchParams.get('refresh');

  if (isRefresh) {
    return new Response(null, {
      status: 302,
      headers: { 'Location': `https://planmovies.com?connect=refresh&account=${accountId}` },
    });
  }

  return new Response(null, {
    status: 302,
    headers: { 'Location': `https://planmovies.com?connect=complete&account=${accountId}` },
  });
}

// --- EVENTS: CREATE ---

async function createEvent(env, { organizer_id, movie_title, tmdb_id, poster_url, theater_name, theater_address, showtime, ticket_price_cents }) {
  if (!organizer_id || !movie_title || !theater_name || !showtime || !ticket_price_cents) {
    throw new Error('Missing required fields');
  }

  const [organizer] = await supabaseQuery(env, 'GET', 'organizers', null, {
    id: `eq.${organizer_id}`,
    select: '*',
  });

  if (!organizer?.stripe_account_id) throw new Error('Organizer has no connected Stripe account');

  const platformFee = parseInt(env.PLATFORM_FEE_CENTS || '250');
  const totalPriceCents = ticket_price_cents + platformFee;

  const slug = movie_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') +
    '-' + new Date(showtime).toISOString().slice(0, 10);

  const product = await stripeAPI(env, 'POST', '/products', {
    name: `${movie_title} - ${theater_name}`,
    ...(poster_url ? { 'images[0]': poster_url } : {}),
    'statement_descriptor': 'PLANMOVIES',
    'unit_label': 'ticket',
  }, organizer.stripe_account_id);

  const price = await stripeAPI(env, 'POST', '/prices', {
    product: product.id,
    unit_amount: totalPriceCents.toString(),
    currency: 'usd',
  }, organizer.stripe_account_id);

  const paymentLink = await stripeAPI(env, 'POST', '/payment_links', {
    'line_items[0][price]': price.id,
    'line_items[0][quantity]': '1',
    'line_items[0][adjustable_quantity][enabled]': 'true',
    'line_items[0][adjustable_quantity][minimum]': '1',
    'line_items[0][adjustable_quantity][maximum]': '10',
    'application_fee_amount': platformFee.toString(),
    'payment_intent_data[statement_descriptor]': 'PLANMOVIES',
  }, organizer.stripe_account_id);

  const [event] = await supabaseQuery(env, 'POST', 'events', {
    organizer_id,
    slug,
    movie_title,
    tmdb_id,
    poster_url,
    theater_name,
    theater_address,
    showtime,
    ticket_price_cents,
    platform_fee_cents: platformFee,
    stripe_product_id: product.id,
    stripe_price_id: price.id,
    stripe_payment_link_id: paymentLink.id,
    stripe_payment_link_url: paymentLink.url,
    status: 'active',
  });

  return {
    event_id: event.id,
    slug: event.slug,
    payment_link: paymentLink.url,
    total_price_cents: totalPriceCents,
    ticket_price_cents,
    platform_fee_cents: platformFee,
  };
}

// --- EVENTS: GET PAYMENT LINK ---

async function getPaymentLink(env, slug) {
  if (!slug) throw new Error('slug required');

  const [event] = await supabaseQuery(env, 'GET', 'events', null, {
    slug: `eq.${slug}`,
    select: 'id,movie_title,theater_name,showtime,ticket_price_cents,platform_fee_cents,stripe_payment_link_url,status',
  });

  if (!event) throw new Error('Event not found');

  return {
    event_id: event.id,
    movie_title: event.movie_title,
    theater_name: event.theater_name,
    showtime: event.showtime,
    payment_link: event.stripe_payment_link_url,
    ticket_price_cents: event.ticket_price_cents,
    platform_fee_cents: event.platform_fee_cents,
    status: event.status,
  };
}

// --- WEBHOOKS: STRIPE ---

async function handleStripeWebhook(request, env) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  const event = JSON.parse(body);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    await supabaseQuery(env, 'POST', 'payments', {
      event_id: session.metadata?.event_id || null,
      stripe_payment_intent_id: session.payment_intent,
      stripe_checkout_session_id: session.id,
      payer_name: session.customer_details?.name,
      payer_email: session.customer_details?.email,
      amount_cents: session.amount_total,
      platform_fee_cents: parseInt(env.PLATFORM_FEE_CENTS || '250'),
      organizer_amount_cents: session.amount_total - parseInt(env.PLATFORM_FEE_CENTS || '250'),
      quantity: 1,
      status: 'succeeded',
      stripe_receipt_url: null,
    });

    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      const name = session.customer_details?.name || 'Someone';
      const amount = (session.amount_total / 100).toFixed(2);
      await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: `💰 ${name} just paid $${amount} for tickets`,
          parse_mode: 'HTML',
        }),
      });
    }
  }

  if (event.type === 'account.updated') {
    const account = event.data.object;
    if (account.charges_enabled) {
      const url = new URL(`${env.SUPABASE_URL}/rest/v1/organizers`);
      url.searchParams.set('stripe_account_id', `eq.${account.id}`);
      await fetch(url.toString(), {
        method: 'PATCH',
        headers: {
          'apikey': env.SUPABASE_SERVICE_KEY,
          'Authorization': `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stripe_onboarding_complete: true }),
      });
    }
  }

  return new Response('ok', { status: 200 });
}
