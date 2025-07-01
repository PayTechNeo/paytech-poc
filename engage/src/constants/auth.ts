export const FORM_FIELDS_NAMES = {
  EMAIL: 'email',
  PASSWORD: 'password'
} as const

export type FormFieldName = typeof FORM_FIELDS_NAMES[keyof typeof FORM_FIELDS_NAMES] 