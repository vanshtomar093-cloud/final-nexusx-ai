import type { Metadata } from 'next';
import { Playfair_Display, Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import { cn } from '@/lib/utils';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nexus X AI — AI Automation Agency',
  description: 'Ultra-premium, luxury, cinematic AI automation solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          playfair.variable,
          spaceMono.variable,
          dmSans.variable,
          'bg-primary-bg text-primary-text font-sans antialiased min-h-screen selection:bg-accent selection:text-white'
        )}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
