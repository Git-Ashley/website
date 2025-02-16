'use client'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const { setTheme, theme } = useTheme()
  const isDark = theme !== 'light';

  if (!mounted) return null // to prevent Hydration Error

  /*
  inline-flex
  items-center
  justify-center
  whitespace-nowrap
  rounded-md
  transition-colors
  focus-visible:outline-hidden
  focus-visible:ring-1
  focus-visible:ring-ring
  disabled:pointer-events-none
  disabled:opacity-50
  [&_svg]:pointer-events-none
  [&_svg]:size-4
  [&_svg]:shrink-0
  hover:bg-accent
  hover:text-accent-foreground
  py-2
  group/toggle
  h-8
  w-8
  px-0
  */

  // Look up a template for general backend. Which DB works best with next.js, etc.
  // **ATM** Prisma + Postgres seem to be the way to go. Dockerize them all.
  // Later: Look up an authentication template you can bring in.


  return (
    <div className='relative inline-block text-left'>
      <Button
        size='sm'
        type='button'
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        variant="ghost"
      >
        <Sun className="hidden dark:block"/>
        <MoonStar className="block dark:hidden" />
      </Button>
    </div>
  )
}
