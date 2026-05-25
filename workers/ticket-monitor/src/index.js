export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(checkTickets(env));
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/check') {
      const result = await checkTickets(env);
      return Response.json(result);
    }

    if (url.pathname === '/status') {
      const status = await getStatus(env);
      return Response.json(status);
    }

    return new Response('PlanMovies Ticket Monitor', { status: 200 });
  },
};

async function checkTickets(env) {
  const theaterCode = env.THEATER_CODE || '1665';
  const movieId = env.REGAL_MOVIE_ID || 'ho00020460';
  const movieTitle = env.MOVIE_TITLE || 'Disclosure Day';

  const dates = getNextDays(14);
  let found = [];

  for (const date of dates) {
    try {
      const showtimes = await fetchShowtimes(theaterCode, date);
      if (!showtimes || !showtimes.length) continue;

      const matching = showtimes.filter(s =>
        s.title?.toLowerCase().includes('disclosure') ||
        s.movieId?.includes(movieId) ||
        s.hoCode?.includes(movieId)
      );

      if (matching.length > 0) {
        found.push(...matching.map(s => ({
          date,
          title: s.title,
          time: s.showtime || s.time,
          format: s.format || 'Standard',
          movieId: s.movieId || s.hoCode,
          bookingUrl: s.bookingUrl || buildBookingUrl(theaterCode, s),
        })));
      }
    } catch (err) {
      console.error(`Error checking ${date}:`, err.message);
    }
  }

  const result = {
    checked: new Date().toISOString(),
    theater: env.THEATER_NAME,
    theaterCode,
    movie: movieTitle,
    ticketsAvailable: found.length > 0,
    showtimes: found,
  };

  if (found.length > 0) {
    const alreadyNotified = await env.TICKET_KV?.get('notified');
    if (!alreadyNotified) {
      await sendAlert(env, found);
      await updateSupabase(env, found);
      await env.TICKET_KV?.put('notified', 'true', { expirationTtl: 86400 });
    }
  }

  return result;
}

async function fetchShowtimes(theaterCode, date) {
  const formattedDate = formatDate(date);

  const url = `https://www.regmovies.com/api/getShowtimes?theatres=${theaterCode}&date=${formattedDate}&ignoreCache=true`;

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      'Accept': 'application/json',
      'Referer': 'https://www.regmovies.com/',
    },
  });

  if (!res.ok) {
    if (res.status === 403) {
      console.log(`Cloudflare blocked request for ${formattedDate}, trying fallback`);
      return await fetchShowtimesFallback(theaterCode, formattedDate);
    }
    return [];
  }

  const data = await res.json();

  if (Array.isArray(data)) return data;
  if (data?.movies) return data.movies;
  if (data?.showtimes) return data.showtimes;

  return [];
}

async function fetchShowtimesFallback(theaterCode, date) {
  const url = `https://www.regmovies.com/theatres/regal-secaucus-showplace-${theaterCode}#/buy-tickets-by-cinema?in-cinema=${theaterCode}&at=${date}`;
  console.log(`Fallback URL: ${url}`);
  return [];
}

async function sendAlert(env, showtimes) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('ALERT: Tickets found but no Telegram config. Showtimes:', JSON.stringify(showtimes));
    return;
  }

  const firstShow = showtimes[0];
  const bookingUrl = firstShow.bookingUrl || 'https://www.regmovies.com/movies/disclosure-day-ho00020460';

  const lines = [
    '<b>DISCLOSURE DAY TICKETS ARE LIVE</b>',
    '',
    `Regal Secaucus ShowPlace 14`,
    `${showtimes.length} showtime(s) found`,
    '',
    ...showtimes.slice(0, 5).map(s =>
      `${s.date} ${s.time || ''} ${s.format !== 'Standard' ? '(' + s.format + ')' : ''}`.trim()
    ),
    '',
    `<a href="${bookingUrl}">BUY TICKETS NOW</a>`,
    '',
    `<a href="https://planmovies.com">Open PlanMovies</a>`,
  ];

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: false,
    }),
  });

  if (!res.ok) {
    console.error('Telegram error:', await res.text());
  } else {
    console.log('Telegram alert sent to chat', chatId);
  }
}

async function updateSupabase(env, showtimes) {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('No Supabase config, skipping status update');
    return;
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/ticket_status`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      id: 'disclosure-day-secaucus',
      tickets_live: true,
      showtimes: JSON.stringify(showtimes),
      detected_at: new Date().toISOString(),
    }),
  });

  if (!res.ok) {
    console.error('Supabase update error:', await res.text());
  }
}

async function getStatus(env) {
  const notified = await env.TICKET_KV?.get('notified');
  return {
    monitoring: true,
    theater: env.THEATER_NAME,
    movie: env.MOVIE_TITLE,
    alreadyNotified: !!notified,
    nextCheck: 'every 15 minutes',
  };
}

function getNextDays(count) {
  const dates = [];
  const start = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function formatDate(date) {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const y = date.getFullYear();
  return `${m}-${d}-${y}`;
}

function buildBookingUrl(theaterCode, showtime) {
  return `https://www.regmovies.com/movies/disclosure-day-ho00020460`;
}
