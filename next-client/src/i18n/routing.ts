import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/cv': {
      en: '/resume',
      fr: '/cv'
    },
    '/projects': {
      en: '/projects',
      fr: '/projets'
    },
    '/projects/social-app/lobby': '/projects/social-app/lobby',
    '/projects/social-app/lobby-test': '/projects/social-app/lobby-test',
    '/projects/social-app/node-shooter': '/projects/social-app/node-shooter',
    '/projects/memapp': '/projects/memapp',
    '/projects/room-pattern/summary': '/projects/room-pattern/summary',
    '/projects/room-pattern/samples': '/projects/room-pattern/samples',
    '/projects/room-pattern/docs': '/projects/room-pattern/docs',
    '/projects/node-shooter': '/projects/node-shooter',
    '/projects/ap-algorithm': '/projects/ap-algorithm',
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);