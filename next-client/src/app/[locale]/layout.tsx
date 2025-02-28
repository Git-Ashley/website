import { ThemeProvider } from '@/src/app/[locale]/components/ThemeProvider'
import type { Metadata } from 'next'

import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';
import { notFound } from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import { Rubik, Space_Grotesk } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { Header } from './components/Header'
import './globals.css'

const rubik = Rubik({
  subsets: [],
  variable: '--rubik'
})
const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})
export const metadata: Metadata = {
  title: 'Ashley Phillips portfolio',
  description: 'Using nextjs 15, react 19 & tailwind 4'
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir='ltr'
      className={`${space_grotesk.variable} ${rubik.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className='w-full'>
        <div className='mx-auto max-w-(--breakpoint-2xl)'>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='light'
            themes={[
              'light',
              'dark',
            ]}
          >
            <NextIntlClientProvider messages={messages}>
              <NextTopLoader
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                easing='ease'
                speed={200}
                shadow='0 0 10px #2299DD,0 0 5px #2299DD'
                color='var(--primary)'
                showSpinner={false}
              />
              <Header locale={locale} />
              <main className="flex max-w-[800px] mx-auto justify-center pb-10">
                {children}
              </main>
            </NextIntlClientProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
