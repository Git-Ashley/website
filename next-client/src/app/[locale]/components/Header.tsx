'use client'
import { Link, Pathnames } from '@/src/i18n/routing'
import { useTranslations } from 'next-intl'
import { FC, Suspense, useMemo } from 'react'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './SimpleThemeSwitch'
import { House } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSelectedLayoutSegments } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'


interface Props {
  locale: string
}

const headerNavStyles = `text-primary relative md:px-2 after:content-[''] after:h-0.5
after:bg-primary after:absolute after:-bottom-2`;
const onHoverHeaderNavStyles = `after:left-1/2 after:w-0 after:transition-all
  after:duration-300 after:ease-in-out
  hover:after:w-full hover:after:left-0`;

const homeIconStyles = `
  absolute left-0 right-0 bottom-0 top-0
  transition-colors duration-300 ease-in-out
  [clip-path:polygon(50%_5%,88%_40%,86%_85%,64%_85%,64%_52%,36%_52%,36%_85%,13%_85%,10%_37%)]`;


const Placeholder = () => (
  <div className='grid grid-cols-3 items-center gap-3 py-5 px-3'>
    <nav className='items-center gap-5 col-start-1 md:col-start-2 col-span-2 md:col-span-1 md:justify-self-center inline-flex whitespace-nowrap'>
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-5 w-25" />
      <Skeleton className="h-5 w-25" />
    </nav>
    <div className="col-start-3 col-span-1 flex items-center gap-2 md:gap-4 justify-self-end">
      <Skeleton className="h-7 w-20" />
      <Skeleton className="h-7 w-7" />
    </div>
  </div>
);

export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  const [currentPath] = useSelectedLayoutSegments()

  const navLinks: { path: Pathnames, label: string }[] = useMemo(() => [
    { path: "/cv", label: t('CV') },
    { path: "/projects", label: t('Projects') },
  ], [t]);

  return (
    <Suspense fallback={<Placeholder/>}>
      <div className='grid grid-cols-3 items-center gap-3 py-5 px-3'>
        <nav className='gap-5 col-start-1 md:col-start-2 col-span-2 md:col-span-1 md:justify-self-center inline-flex whitespace-nowrap'>
          <Link lang={locale} href='/' className="md:mx-2 relative size-6">
            <div className={cn(
              "absolute left-0 right-0 bottom-0 top-0",
              { "hover:[&>*]:bg-primary-30 dark:hover:[&>*]:bg-primary-50": Boolean(currentPath) },
              { "[&>*]:bg-primary": !currentPath },
            )}>
              <div className={homeIconStyles} />
            </div>
            <House size={24} className="absolute pointer-events-none z-10 text-primary" />
          </Link>
          {navLinks.map(({ path, label }) => <Link
            key={path}
            lang={locale}
            href={path}
            className={cn(
              headerNavStyles,
              { [onHoverHeaderNavStyles]: `/${currentPath}` !== path  },
              { "after:w-full after:left-0": `/${currentPath}` === path }
            )}
          >
            {label}
          </Link>)}
        </nav>
        <div className="col-start-3 col-span-1 flex items-center md:gap-1 justify-self-end">
          <LangSwitcher />
          <ThemeSwitch />
        </div>
      </div>
    </Suspense>
  )
}