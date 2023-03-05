import { NextApiRequest, NextApiResponse } from 'next';

import { Ratelimit } from '@upstash/ratelimit';
import requestIp from 'request-ip';

import redis from '@/lib/redis';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, '1440 m'),
      analytics: true,
    })
  : undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Rate Limiter Code
  if (ratelimit) {
    const identifier = requestIp.getClientIp(req);
    const result = await ratelimit.limit(identifier!);
    res.setHeader('X-RateLimit-Limit', result.limit);
    res.setHeader('X-RateLimit-Remaining', result.remaining);

    if (!result.success) {
      res.status(429).json({ error: 'Too many checks in 1 day. Please try again in 24 hours.' });
      return;
    }
  }

  const { prompt } = req.body;

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const payload = {
    model: 'text-davinci-003',
    // model: 'gpt-3.5-turbo',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 800,
    stream: false,
    n: 1,
  };

  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const json = await response.json();
  const answer = json.choices[0].text.replace(/(\r\n|\n|\r)/gm, '');
  const indexOfFirst = answer.indexOf('{');
  const cleanAnswer = answer.slice(indexOfFirst);

  res.status(200).json(cleanAnswer);
}
