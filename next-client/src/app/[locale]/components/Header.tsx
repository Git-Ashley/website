'use client'
import { Link } from '@/src/i18n/routing'
import { useTranslations } from 'next-intl'
import { FC } from 'react'
import GithubIcon from '../../icons/github'
import LangSwitcher from './LangSwitcher'
import ThemeSwitch from './SimpleThemeSwitch'
import { FiHome } from 'react-icons/fi'

interface Props {
  locale: string
}
export const Header: FC<Props> = ({ locale }) => {
  const t = useTranslations('')
  return (
    <div className='grid grid-cols-3 items-center gap-3 py-5 px-3'>
      <nav className='col-start-1 md:col-start-2 col-span-2 md:col-span-1 md:justify-self-center inline-flex gap-5 md:gap-6 whitespace-nowrap'>
        <Link lang={locale} href='/' className="flex items-center">
          <FiHome size={24} />
        </Link>
        <Link lang={locale} href="/about">
          {t('About')}
        </Link>
        <Link lang={locale} href="/projects">{t('Projects')}</Link>
      </nav>
      <div className="col-start-3 col-span-1 flex items-center gap-3 justify-self-end">
        <LangSwitcher />
        <ThemeSwitch />
      </div>
    </div>
  )
}
