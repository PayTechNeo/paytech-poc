'use client'

import { Link as RouterLink } from 'react-router-dom'
import { forwardRef } from 'react'
import clsx from 'clsx'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  to: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { className, to, ...props },
  ref
) {
  return (
    <RouterLink
      ref={ref}
      to={to}
      className={clsx(
        'text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300',
        className
      )}
      {...props}
    />
  )
}) 