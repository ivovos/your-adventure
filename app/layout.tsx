import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Your Adventure Library - 11+ Learning',
  description: 'Interactive educational adventures for 11+ Kent Test preparation. Master verbal reasoning and spelling through engaging stories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
