import React from 'react'
import clsx from 'clsx'

interface LabelProps {
  color?: string
  fontSize?: string
  fontWeight?: string
  isRequired?: boolean
  asteriskPosition?: 'start' | 'end'
  children: React.ReactNode
  customClass?: string
  onChangeCb?: () => void
}

const Label: React.FC<LabelProps> = ({
  fontSize = 'sm',
  fontWeight = 'normal',
  isRequired = false,
  asteriskPosition = "end",
  children,
  customClass = "",
  onChangeCb = () => {}
}) => {
  const asterisk = isRequired ? <span className="text-red-500 m-1">*</span> : null;

  return (
    <label
      className={clsx(
        'relative',
        'text-left',
        'block',
        'text-black',
        `text-${fontSize}`,
        `font-${fontWeight}`,
        customClass
      )}
      onClick={onChangeCb}
    >
      {asteriskPosition === 'start' && asterisk}
      {children}
      {asteriskPosition === 'end' && asterisk}
    </label>
  )
}

export default Label 