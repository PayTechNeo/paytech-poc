import React from 'react'
import { HEADING, HeadingType } from './Constants';

interface HeadingProps {
  type?: HeadingType;
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  onClickCb?: () => void;
  customClasses?: string;
}

const Heading: React.FC<HeadingProps> = ({ 
  type = "", 
  children, 
  color = "", 
  fontSize, 
  fontWeight = "", 
  onClickCb = () => { }, 
  customClasses = "" 
}) => {
    const labelStyles = {
        color: color || 'black',
        fontSize: fontSize || 'sm',
        weight: fontWeight || "normal"
    };
    
    switch (type) {
        case HEADING.H1:
            return (
                <h1 onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h1>
            );
        case HEADING.H2:
            return (
                <h2 onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h2>
            );
        case HEADING.H3:
            return (
                <h2 onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h2>
            );
        default:
            return (
                <h2 onClick={onClickCb} className={`text-${labelStyles.color} text-${labelStyles.fontSize} font-${labelStyles.weight} ${customClasses}`}>{children}</h2>
            );
    }
}

export default Heading 