'use client'
import { cn } from '@/lib/utils'
import styles from './styles.module.css'

export const NeonSign = ({ className }: { readonly className?: string }) => (
  <div className={cn(styles.logo, className)}><span>O</span>pen</div>
)