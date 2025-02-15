'use client'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import Button from './Button'
import { useEffect, useState } from 'react';


/*
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary-foreground: 0 0% 98%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 10% 3.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;

DARK:
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
*/

export default function ThemeSwitch() {
  const t = useTranslations('')
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

  // Upgrade to new shadcn. https://ui.shadcn.com/docs/tailwind-v4#upgrade-your-project
  // Remove unused packages and ensure still works
  // Fix the hover styles on the dropdown (or just use shadcn dropdown)
  // Use lucide react icons instead
  // Import Button and use it below, ensure its same as on shadcn website
  // Remove all use of 'hsl' in tailwind config one at a time and see how it goes.
  return (
    <div className='relative inline-block text-left'>
      <Button
        size='small'
        type='button'
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className='bg-transparent'
      >
        <BsSunFill className="hidden dark:block size-5 text-primary"/>
        <BsMoonStarsFill className="block dark:hidden size-5 text-primary" />
      </Button>
    </div>
  )
}
