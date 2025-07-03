import React from 'react';

import { SettingTemplatesIcon } from './icons/SettingTemplatesIcon';

interface IconProps {
	style?: React.CSSProperties;
	height?: number | string;
	width?: number | string;
}

interface IconsProps {
	iconName: string;
	transformScale?: number;
	rotateDeg?: number;
	style?: React.CSSProperties;
	height?: number | string;
	width?: number | string;
}

const icons: Record<string, (iconProps: IconProps) => React.ReactElement> = {
	settingTemplatesIcon: () => <SettingTemplatesIcon />,
	
};

const Icons: React.FC<IconsProps> = ({ iconName, transformScale = 1, rotateDeg = 0, style, height, width }) => {
	const iconProps: IconProps = {
		style: {
			...style,
			transform: `scale(${transformScale}) rotate(${rotateDeg}deg)`,
		},
		height: height,
		width: width,
	};
	const icon = icons[iconName];

	if (!icon) {
		return null;
	}
	return React.cloneElement(icon(iconProps), iconProps);
};

export default Icons;
