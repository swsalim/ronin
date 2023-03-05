import '@/styles/global.css';

import localFont from '@next/font/local';

import { cn } from '@/lib/utils';

import { AnalyticsWrapper } from '@/components/Analytics';

const myFont = localFont({
  src: [
    {
      path: '../styles/fonts/wotfard-bolditalic-webfont.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../styles/fonts/wotfard-bold-webfont.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../styles/fonts/wotfard-semibolditalic-webfont.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../styles/fonts/wotfard-semibold-webfont.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../styles/fonts/wotfard-mediumitalic-webfont.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../styles/fonts/wotfard-medium-webfont.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../styles/fonts/wotfard-regularitalic-webfont.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../styles/fonts/wotfard-regular-webfont.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/fonts/wotfard-lightitalic-webfont.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../styles/fonts/wotfard-light-webfont.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-wotfard',
});

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn('bg-slate-900 font-sans text-slate-100 antialiased', myFont.variable)}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen">
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
