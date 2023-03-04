import { NextApiRequest, NextApiResponse } from 'next';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  if (!prompt) {
    return new Response('No prompt in the request', { status: 400 });
  }

  const payload = {
    model: 'text-davinci-003',
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
