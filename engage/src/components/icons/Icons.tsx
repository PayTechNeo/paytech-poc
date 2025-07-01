import React from 'react';

interface IconProps {
  style?: React.CSSProperties;
  color?: string;
  stroke?: string;
  iconName?: string;
  height?: string | number;
  width?: string | number;
  onClick?: () => void;
}

const icons: Record<string, React.FC<IconProps>> = {
	// scheduleIcon: (iconProps) => <ScheduleIcon color={iconProps.color} style={iconProps.style} />,
	// trashIcon: (iconProps) => <TrashIcon color={iconProps.color} style={iconProps.style} />,
};

interface IconsProps {
  iconName: string;
  color?: string;
  transformScale?: number;
  rotateDeg?: number;
  style?: React.CSSProperties;
  height?: string | number;
  width?: string | number;
  onClick?: () => void;
}

const Icons: React.FC<IconsProps> = ({ 
  iconName, 
  color, 
  transformScale = 1, 
  rotateDeg = 0, 
  style, 
  height, 
  width, 
  onClick = () => {} 
}) => {
	const iconProps: IconProps = {
		style: {
			...style,
			transform: `scale(${transformScale}) rotate(${rotateDeg}deg)`,
			cursor: 'pointer'
		},
		color: color,
		stroke: color,
		iconName: '',
		height: height,
		width: width,
		onClick: onClick
	};

	const IconComponent = icons[iconName];

	if (!IconComponent) {
		return null;
	}

	return <IconComponent {...iconProps} />;
};

export default Icons; 