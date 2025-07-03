// Button variants
export const BUTTON_VARIANTS = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined',
  OUTLINED_GRAY: 'outlined_gray',
  CONTAINED_GRAY: 'contained_gray',
  TEXT: 'text'
} as const

export type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS] 