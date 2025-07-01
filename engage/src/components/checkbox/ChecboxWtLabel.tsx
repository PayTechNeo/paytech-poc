import React from 'react'
import Checkbox from './Checkbox'
import { Label } from '../label'

interface CheckboxWtLabelProps {
  checked?: boolean
  disabled?: boolean
  label: string
}

const CheckboxWtLabel: React.FC<CheckboxWtLabelProps> = ({ 
  checked = false, 
  disabled = false, 
  label 
}) => {
  return (
    <div className='flex items-center'>
      <Checkbox checked={checked} disabled={disabled} />
      <Label customClass="ml-24">{label}</Label>
    </div>
  )
}

export default CheckboxWtLabel 