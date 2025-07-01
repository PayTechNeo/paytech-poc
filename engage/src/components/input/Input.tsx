import React from 'react'
import { ErrorMessage } from 'formik'
import { Label } from '../label'
import clsx from 'clsx'

interface InputProps {
  name?: string
  id?: string | null
  placeholder?: string
  label?: string
  labelColor?: string
  labelFontSize?: string
  labelfontWeight?: string
  isRequired?: boolean
  required?: boolean
  asteriskPosition?: 'start' | 'end'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  bgInputColor?: string
  customClasses?: string
  errorContainerClasses?: string
  type?: string
  disabled?: boolean
  autoComplete?: string
  error?: string | false | undefined
  touched?: boolean
}

const Input: React.FC<InputProps> = ({
  name = "",
  id = null,
  placeholder = "",
  label = "",
  labelColor = "",
  labelFontSize = "",
  labelfontWeight = "bold",
  isRequired = false,
  asteriskPosition = "end",
  startIcon = "",
  endIcon = "",
  value = "",
  onChange = () => { },
  onFocus = () => { },
  onBlur = () => { },
  customClasses = "",
  errorContainerClasses = "",
  type = "text",
  disabled = false,
  autoComplete = "",
  error = undefined,
  touched = false
}) => {
  return (
    <div className="block w-full justify-start relative">
      {label && (
        <div>
          <Label
            color={labelColor}
            fontSize={labelFontSize}
            fontWeight={labelfontWeight}
            isRequired={isRequired}
            asteriskPosition={asteriskPosition}
          >
            {label}
          </Label>
        </div>
      )}

      <div className="relative">
        {startIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {startIcon}
          </span>
        )}

        <input
          autoComplete={autoComplete}
          type={type}
          name={name}
          id={id || undefined}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={clsx(
            'appearance-none block w-full px-3 py-2',
            'border rounded-md shadow-sm',
            'placeholder-gray-400',
            'text-gray-900',
            'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
            'sm:text-sm',
            error || (touched && error) ? 'border-red-300' : 'border-gray-300',
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            customClasses
          )}
        />

        {endIcon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </span>
        )}
      </div>

      {name && (
        <div className={clsx("mt-2", errorContainerClasses)}>
          <ErrorMessage name={name}>
            {(msg: any) => (
              <p className="text-sm text-red-600 text-left">
                {typeof msg === 'string' ? msg : msg.label}
              </p>
            )}
          </ErrorMessage>
        </div>
      )}
      {error && !name && (
        <div className={clsx("mt-2", errorContainerClasses)}>
          <p className="text-sm text-red-600 text-left">{error}</p>
        </div>
      )}
    </div>
  )
}

export default Input 