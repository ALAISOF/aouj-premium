import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import RootLayoutClient from './components/RootLayoutClient';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#070B19' },
    { media: '(prefers-color-scheme: dark)', color: '#070B19' },
  ],
};

export const metadata: Metadata = {
  title: 'AOUJ Premium | Portal de Transport et Excursions',
  description: 'Plateforme de réservation premium pour transport et excursions touristiques. Découvrez nos services exclusifs.',
  keywords: [
    'transport',
    'excursions',
    'réservation',
    'AOUJ',
    'premium',
    'voyage',
    'tourisme',
  ],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  authors: [{ name: 'AOUJ Premium', url: 'https://aouj-premium.com' }],
  creator: 'AOUJ Premium',
  publisher: 'AOUJ Premium',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://aouj-premium.com'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'ar_SA'],
    url: 'https://aouj-premium.com',
    siteName: 'AOUJ Premium',
    title: 'AOUJ Premium | Portal de Transport et Excursions',
    description: 'Plateforme de réservation premium pour transport et excursions touristiques.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AOUJ Premium Portal',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 800,
        height: 800,
        alt: 'AOUJ Premium Square',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AOUJ Premium | Portal de Transport et Excursions',
    description: 'Plateforme de réservation premium pour transport et excursions touristiques.',
    images: ['/og-image.jpg'],
    creator: '@aoujpremium',
    site: '@aoujpremium',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#94B3DB',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AOUJ Premium',
  },
  appLinks: {
    ios: [
      {
        app_name: 'AOUJ Premium',
        app_store_id: '123456789',
        url: 'https://aouj-premium.com',
      },
    ],
    android: [
      {
        package: 'com.aouj.premium',
        app_name: 'AOUJ Premium',
        url: 'https://aouj-premium.com',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AOUJ Premium" />
        <meta name="msapplication-TileColor" content="#070B19" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="bg-[#070B19] text-white antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}