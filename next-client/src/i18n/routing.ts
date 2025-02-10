import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    pathnames: {
      '/': '/',
      '/about': {
        en: '/about',
        fr: '/à-propos'
      },
      '/blog': '/blog',
      '/projects': {
        en: '/projects',
        fr: '/projets'
      },
    }
  });
  
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);