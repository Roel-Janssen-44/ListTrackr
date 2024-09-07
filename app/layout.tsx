import './global.css';
import { inter } from '@/app/components/fonts';
import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';
import { Metadata } from 'next';
import Head from 'next/head';
import { ThemeProvider } from '@/app/components/themeProvider';
import GoogleAnalytics from '@/app/components/googleAnalytics';

export const metadata: Metadata = {
  title: {
    template: '%s | ListTrackr',
    default: 'ListTrackr',
  },
  description:
    'ListTrackr is your personal productivity companion designed to help you turn your aspirations into accomplishments.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <GoogleAnalytics />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta name="ListTrackr" content="ListTrackr" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ListTrackr" />
        <meta name="description" content="ListTrackr" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#5E0035" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${inter.className} bg-[#f5f5f5] text-primary antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
