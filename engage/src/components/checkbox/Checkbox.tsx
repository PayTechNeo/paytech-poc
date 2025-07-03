import React from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    checked?: boolean;
    onChangeCb?: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
    label, 
    checked, 
    onChangeCb, 
    className, 
    disabled,
    ...props 
}) => {
      
    return (
        <div className={`flex items-center ${className || ''}`}>
            <div className="flex items-center">
                <input
                    className={`h-4 w-4 sm:h-4 sm:w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer min-w-[16px] min-h-[16px]`}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onChangeCb && onChangeCb(e.target.checked)}
                    {...props}
                />
                {label && (
                    <label className="ml-2 block text-sm text-gray-900 cursor-pointer select-none">
                        {label}
                    </label>
                )}
            </div>
        </div>
    );
};

export default Checkbox; 