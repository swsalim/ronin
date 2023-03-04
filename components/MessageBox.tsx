'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';

import { FADE_DOWN_ANIMATION_VARIANTS } from '@/lib/constant';

import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';
import ResizablePanel from '@/components/ResizablePanel';

export default function MessageBox() {
  const resultRef = useRef(null);

  const defaultValues = { summary: '', result: false, value: 0, list: [] };

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [checkedMessage, setCheckedMessage] = useState(defaultValues);

  const prompt = `I want you to act as a cyber security expert. Given the content below, create a JSON object with properties named "summary", "result", "value" and "explanations".
  "summary" is a string that summaries the analysis not longer than 250 characters.
  "result" is a boolean that returns true if the content is a SCAM and false if it's not a SCAM.
  "value" is a number where you estimate the collateral damage the scam might cause in term of dollar.
  "list" is an array that contains objects with properties "sentence" and "explanation".
  "sentence" is words or sentences that help with your analysis and "explanation" is the explanations for the sentence. Explain in a way a fifth grader would understand.
  If there is a brand or website url mention, check on google if the brand or website url is legit.

  Make sure "list" array is in the correct format. Don't return any string outside the response object.

  The resulting JSON object should be in this format: {"summary":"string", "result":"boolean", "value":"number", "list": [{"sentence":"string","explanation":"string"}]. It should be a valid JSON object.
  The content:${message}`;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // delay: 1,
        staggerChildren: 0.5,
      },
    },
  };

  // eslint-disable-next-line
  const checkMessage = async (e: any) => {
    e.preventDefault();
    setCheckedMessage(defaultValues);
    setShowResult(false);
    setLoading(true);

    const response = await fetch('/api/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // const data = response.body;
    // if (!data) {
    //   return;
    // }

    // TODO: improve with ReadableStream
    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);
    //   setCheckedMessage((prev) => prev + chunkValue);
    // }

    const answer = await response.json();
    setCheckedMessage(JSON.parse(answer));

    // const answer = {
    //   summary: 'Ad sint aute veniam id laboris fugiat ea dolor cupidatat.',
    //   result: true,
    //   value: 0,
    //   list: [],
    // };

    setShowResult(true);

    // TODO: fixed scrolling
    // if (resultRef.current instanceof HTMLElement) {
    //   resultRef.current.scrollIntoView({ behavior: 'smooth' });
    // }

    setLoading(false);
  };

  return (
    <>
      <label htmlFor="message" className="sr-only">
        Add your message
      </label>
      <div className="mt-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={10}
          className="w-full rounded-md border-slate-700 bg-transparent border-solid border shadow-sm focus:border-purpose my-5 p-4 text-slate-200 focus:ring-4 ring-purple-300 focus:ring-offset-2 focus:outline-none"
          placeholder={`e.g. I am Reverend Sister Mary Helen from St Patrick's Catholic Church here in #20 Grosvenor St, The Rocks NSW 2000, Australia, it's very pathetic that we lost Reverend Father Francis Laveth of St Patrick's Catholic Church. Late Rev Father Francis Laveth is from the United States and also an orphan but nationalized in Australia.

Now for you to claim your Donation funds forward the details below to me via this email < collymail@biznetvigator.com > so I can forward it immediately to the Bank for the release of your funds ASAP.`}
        />
      </div>
      {loading ? (
        <Button className="uppercase font-medium" disabled={true}>
          <LoadingSpinner /> Processing...
        </Button>
      ) : (
        <Button variant="gradient" className="capitalize font-medium" onClick={checkMessage}>
          Is it a Scam?
        </Button>
      )}

      {showResult && (
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-16">
              <motion.div
                ref={resultRef}
                initial="hidden"
                whileInView="show"
                animate="show"
                viewport={{ once: true }}
                variants={container}
                className="grid grid-cols-4 gap-4">
                <motion.div
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  className="relative w-48 h-48 mt-8 mx-auto col-start-4 col-span-1 row-start-1">
                  <Image
                    src="/mascot-samurai-transparent.png"
                    alt="Ronin Mascot"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: 'cover',
                    }}
                    className="drop-shadow-[0px_10px_8px_rgba(255,255,255,0.5)]"
                  />
                </motion.div>
                <motion.div
                  className="col-span-3 col-start-1 row-start-1"
                  initial="hidden"
                  animate="show"
                  variants={container}>
                  <div className="space-y-8">
                    <motion.h2
                      variants={FADE_DOWN_ANIMATION_VARIANTS}
                      className="sm:text-4xl text-3xl font-bold mx-auto">
                      Your result
                    </motion.h2>
                    <motion.h3 variants={FADE_DOWN_ANIMATION_VARIANTS}>
                      {checkedMessage.summary}
                    </motion.h3>

                    {checkedMessage.list && (
                      <motion.div
                        className="inline-block min-w-full py-2 px-2 align-middle"
                        variants={FADE_DOWN_ANIMATION_VARIANTS}>
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                  Words/Sentences
                                </th>
                                <th
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Explanations
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {checkedMessage.list.map((item, index) => (
                                <tr key={index}>
                                  <td className="text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {item['sentence']}
                                  </td>
                                  <td className="text-left px-3 py-4 text-sm text-gray-500">
                                    {item['explanation']}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      )}
    </>
  );
}
