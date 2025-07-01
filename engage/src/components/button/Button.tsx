import React from 'react'
import clsx from 'clsx'

// Button variants
export const BUTTON_VARIANTS = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
  OUTLINED_GRAY: 'outlined_gray',
  CONTAINED_GRAY: 'contained_gray',
  TEXT: 'text'
} as const

type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS]

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
  onClickCb?: () => void
  color?: string
  style?: React.CSSProperties
  onMouseOverCb?: () => void
  onMouseLeaveCb?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  title?: string
  className?: string
}

const baseButtonClass =
  'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out'

const variantClasses: Record<ButtonVariant, string> = {
  [BUTTON_VARIANTS.CONTAINED]: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  [BUTTON_VARIANTS.OUTLINED]: 'border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-600 hover:text-white',
  [BUTTON_VARIANTS.OUTLINED_GRAY]: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  [BUTTON_VARIANTS.CONTAINED_GRAY]: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
  [BUTTON_VARIANTS.TEXT]: 'text-indigo-600 bg-transparent hover:bg-gray-50 focus:ring-indigo-500'
}

export const Button: React.FC<ButtonProps> = ({
  variant = BUTTON_VARIANTS.CONTAINED,
  children,
  onClickCb = () => {},
  style = {},
  onMouseOverCb = () => {},
  onMouseLeaveCb = () => {},
  type = 'button',
  disabled = false,
  title,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClickCb}
      onMouseOver={onMouseOverCb}
      onMouseLeave={onMouseLeaveCb}
      type={type}
      disabled={disabled}
      title={title}
      style={style}
      className={clsx(
        baseButtonClass,
        variantClasses[variant],
        className,
        { 'opacity-50 cursor-not-allowed': disabled }
      )}
      {...props}
    >
      {children}
    </button>
  )
} 