import { useTranslations } from 'next-intl'
import Button from './components/Button'
import { Link } from '@/src/i18n/routing'
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: {locale: string};
};

export default function DashboardPage({params: {locale}}: Props) {
  const t = useTranslations('')

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div>
      <section className='flex flex-col items-center justify-center py-24'>
        <div className='my-6 px-20 text-center text-2xl text-text-secondary'>
          {t('Hello. I am Sir Phillips, commander of the 32nd Brigade.')}
        </div>
        <div className='mt-4 flex flex-row gap-4'>
          <Link lang={locale} href="/about">
            <Button rounded size='large' variant='primary'>
              {t('More...')}
            </Button>
          </Link>
        </div>
      </section>
      <section className='bg-background-secondary py-20 max-lg:py-10'>
        <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-7 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
          <div className='text-center'>
            <h2 className='mb-3  text-xl font-semibold'>{t('Project 1')}</h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('project1_desc')}
            </p>
          </div>
          <div className='text-center'>
            <h2 className='mb-3 text-xl font-semibold'>{t('Project 2')}</h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('project2_desc')}
            </p>
          </div>
          <div className='text-center'>
            <h2 className='mb-3 text-xl font-semibold'>{t('Project 3')}</h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('project3_desc')}
            </p>
          </div>
        </div>
        <div className='mt-4 flex flex-row gap-4 justify-self-center'>
          <Link lang={locale} href="/projects">
            <Button rounded size='large'>
              {t('More...')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
