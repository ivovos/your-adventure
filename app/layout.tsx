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
      <body>
        <DesignSystemProvider />
        {children}
      </body>
    </html>
  );
}
