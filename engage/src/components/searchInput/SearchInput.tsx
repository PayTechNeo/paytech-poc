import React from 'react';
import Icons from "../icons/Icons";
import "./style.scss"

interface IconProps {
  icon?: string;
}

interface SearchBarProps {
  value: string;
  onChangeCb: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconProps?: IconProps;
  customclasses?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeCb, 
  placeholder, 
  iconProps = { icon: "searchIcon" }, 
  customclasses = "" 
}) => {
	return (
		<div className="relative min-w-[200px] sm:min-w-[250px]">
			<div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
				{iconProps.icon ? <Icons iconName={iconProps.icon} /> : null}
			</div>
			<input
				type="text"
				className={`fs-14 w-full input-component block p-2 sm:p-[9px] pl-8 sm:pl-10 focus:outline-none placeholder-gray-500 rounded-md opacity-100 bg-white bg-no-repeat bg-0 bg-0/0 padding-box placeholder-sm text-sm sm:text-base ${customclasses}`}
				placeholder={placeholder}
				onChange={onChangeCb}
				value={value}
			/>
		</div>
	);
}

export default SearchBar; 