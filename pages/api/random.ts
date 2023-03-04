import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');

  const intervalId = setInterval(() => {
    const number = Math.random();
    res.write(`data: ${number}\n\n`);
  }, 1000);

  // Listen for the "close" event and stop the interval
  res.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}
