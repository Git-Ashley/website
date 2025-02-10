'use client'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import Button from './Button'
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const t = useTranslations('')
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { setTheme, theme } = useTheme()
  const isDark = theme !== 'light';

  if (!mounted) return null // to prevent Hydration Error

  return (
    <div className='relative inline-block text-left'>
      <Button
        size='small'
        type='button'
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className='bg-transparent'
      >
        {isDark ? <BsSunFill className="size-5 text-primary"/> : <BsMoonStarsFill className="size-5 text-primary" />}      </Button>
    </div>
  )
}
