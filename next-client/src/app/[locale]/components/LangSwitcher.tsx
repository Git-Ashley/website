'use client'
import { capitalize } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import Button from './Button'

const LangSwitcher: React.FC = () => {
  interface LanguageOption {
    name: string
    code: string
  }
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)
  const options: LanguageOption[] = [
    { name: 'English', code: 'en' },
    { name: 'Français', code: 'fr' },
    //{ name: '日本語', code: 'jp' },
  ]

  const currentLang = useMemo(() => {
    const currentLangPathCode = pathname?.split('/')[1];
    const selectedOption = options.find(({ code }) => {
      return code === currentLangPathCode;
    });

    if (selectedOption) {
      return selectedOption;
    }
    return options[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className='flex items-center justify-center'>
      <div className='relative'>
        <Button
          className='text-primary inline-flex w-full items-center justify-between gap-2 bg-transparent'
          size='small'
          onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
          onBlur={() => setIsOptionsExpanded(false)}
        >
          {currentLang.name}
          <FiGlobe className='size-5' />
        </Button>
        {isOptionsExpanded && (
          <div className='absolute right-0 mt-1 w-full origin-top-right rounded-md bg-dropdown shadow-lg'>
            <div
              className='py-1'
              role='menu'
              aria-orientation='vertical'
              aria-labelledby='options-menu'
            >
              {options.map(lang => {
                return (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}/${urlSegments.join('/')}`}
                  >
                    <button
                      lang={lang.code}
                      onMouseDown={e => {
                        e.preventDefault()
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-dropdownHover ${
                        currentLang.code === lang.code
                          ? 'bg-selected text-primary hover:bg-selected'
                          : 'text-secondary'
                      }`}
                    >
                      {capitalize(lang.name)}
                    </button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LangSwitcher
