import type { Metadata } from 'next';
import './globals.css';

import DesignSystemProvider from '@/components/DesignSystemProvider';

export const metadata: Metadata = {
  title: 'Your Adventure - 11+ Kent Test Preparation',
  description: 'Interactive educational adventures for 11+ Kent Test preparation. Master verbal reasoning and spelling through engaging stories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Atkinson+Hyperlegible:wght@400;700&family=Fraunces:opsz,wght,SOFT@9..144,400;9..144,500;9..144,600;9..144,700;9..144,100&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=Instrument+Serif&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <DesignSystemProvider />
        {children}
      </body>
    </html>
  );
}
