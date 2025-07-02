import React from 'react';

import { SettingTemplatesIcon } from './icons/SettingTemplatesIcon';

const icons = {
	settingTemplatesIcon: (iconProps = {}) => <SettingTemplatesIcon color={iconProps.color} />,
	
};
const Icons = ({ iconName, color, transformScale = 1, rotateDeg = 0, style, height, width }) => {
	const iconProps = {
		style: {
			...style,
			transform: `scale(${transformScale}) rotate(${rotateDeg}deg)`,
		},
		color: color,
		stroke: color,
		iconName: '',
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
