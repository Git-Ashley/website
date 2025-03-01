'use client'
import { capitalize } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSelectedLayoutSegments } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const LangSwitcher: React.FC = () => {
  interface LanguageOption {
    name: string
    code: string
  }
  const pathname = usePathname()
  const urlSegments = useSelectedLayoutSegments()
  const router = useRouter()

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false)
  const options: LanguageOption[] = [
    { name: 'English', code: 'en' },
    { name: 'Français', code: 'fr' },
    //{ name: '日本語', code: 'jp' },
  ]

  const currentLang: LanguageOption = useMemo(() => {
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
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="inline-flex text-sm w-full items-center justify-between gap-2"
      >
        <Button type="button" size="sm" variant="ghost">
          <span className="text-xs hidden md:inline">{capitalize(currentLang.name)}</span>
          <span className="text-xs inline md:hidden">{currentLang.code.toUpperCase()}</span>
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map(lang =>
          <DropdownMenuItem
            key={lang.code}
            className="cursor-pointer"
            onClick={() => router.push(`/${lang.code}/${urlSegments.join('/')}`)}
          >
            {capitalize(lang.name)}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LangSwitcher
