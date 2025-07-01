import React from "react";

export interface Option {
  label: string;
  value: string | number;
  iconName?: string;
}

export interface SelectDropdownProps {
  label?: string;
  name?: string;
  startIcon?: React.ReactNode;
  labelColor?: string;
  onChangeCb?: (value: Option | Option[] | null) => void;
  isRequired?: boolean;
  value?: Option | Option[] | null;
  placeholder?: string;
  options?: Option[];
  showToggle?: boolean;
  toggleIcon?: React.ReactNode;
  customClasses?: string;
  isMultiSelect?: boolean;
  disabled?: boolean;
  renderOption?: (option: Option, selectCb: (option: Option) => void) => React.ReactNode;
  isAsync?: boolean;
  openDirection?: "top" | "bottom";
  url?: string;
  labelKey?: string;
  valueKey?: string;
  labelKey2?: string;
  multiSelectAll?: boolean;
  labelFontSize?: string;
  onAddNewCb?: () => void;
  newlyAddedOption?: Option;
  isAddNewOption?: boolean;
  addNewOptBtnLable?: string;
  error?: string | null;
  id?: string;
}

export interface DropdownModalProps {
  options?: Option[];
  isOpen?: boolean;
  onCloseCb?: () => void;
  selectCb?: (option: Option | Option[]) => void;
  selectedOption?: Option | Option[] | null;
  isMultiSelect?: boolean;
  onMouseLeaveCb?: () => void;
  renderOption?: (option: Option, selectCb: (option: Option) => void) => React.ReactNode;
  onDropdownTouchBottomCb?: (isIntersecting: boolean) => void;
  isAsync?: boolean;
  disabled?: boolean;
  openDirection?: "top" | "bottom";
  multiSelectAll?: boolean;
  onAddNewCb?: (() => void) | null;
  newlyAddedOption?: Option;
  isAddNewOption?: boolean;
  addNewOptBtnLable?: string;
  styleprops?: boolean;
  id?: string;
  dropdownOptions?: Option[];
} 