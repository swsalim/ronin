import { absoluteUrl } from '@/lib/utils';

const seo = {
  title: 'Verify Your Text against Scam',
  titleSuffix: '| Ronin',
  finalTitle: '',
  description:
    'Ronin detects scams in emails, messages, and chats. Protect yourself from scams with Ronin - the ultimate solution to stay safe online.',
  url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  og: {
    image: absoluteUrl('/og-default.png'),
    imageAlt: 'Banner for Ronin',
    width: '1200',
    height: '630',
  },
  creator: '@swsalim',
};

seo['finalTitle'] = `${seo.title} ${seo.titleSuffix}`;

export default function Head() {
  return (
    <>
      <title>{seo.finalTitle}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.finalTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.og.image} />
      <meta property="og:image:alt" content={seo.og.imageAlt} />
      <meta property="og:image:width" content={seo.og.width} />
      <meta property="og:image:height" content={seo.og.height} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={seo.creator} />
      <meta name="twitter:title" content={seo.finalTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta property="twitter:url" content={seo.url} />
      <meta name="twitter:image" content={seo.og.image} />
      <link rel="canonical" href={seo.url} />
    </>
  );
}
