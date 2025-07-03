import React, { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DropdownModal from "../dropdownModal";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import useDebounced from "../../hooks/useDebounced";
import type { SelectDropdownProps, Option } from "../../types/selectDropdown";

interface SelectOptionsParams {
  url: string;
  params: {
    page: number;
    limit: number;
    name?: string;
  };
  labelKey?: string;
  valueKey?: string;
  labelKey2?: string;
  addOptions: (options: Option[]) => void;
  handlePaginationChange: (paginationObj: Record<string, unknown>) => void;
  onHasMoreUpdate: (hasMore: boolean) => void;
}

interface PaginationObject {
  pageNumber?: number;
  limit?: number;
  search?: string;
  totalRecords?: number;
}

const getSelectOptions = (params: SelectOptionsParams) => {
  return { type: 'GET_SELECT_OPTIONS', payload: params };
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label = "",
  name = "",
  startIcon,
  labelColor = "[#565656]",
  onChangeCb = () => {},
  isRequired = false,
  value = undefined,
  placeholder = "",
  options = [],
  showToggle = true,
  toggleIcon = "",
  customClasses = "",
  isMultiSelect = false,
  disabled = false,
  renderOption = undefined,
  isAsync = false,
  openDirection = "bottom",
  url = "",
  labelKey,
  valueKey,
  labelKey2,
  multiSelectAll = false,
  labelFontSize = "[12px]",
  onAddNewCb = () => {},
  newlyAddedOption = {} as Option,
  isAddNewOption = false,
  addNewOptBtnLable = "",
  error = null,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | Option[] | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [iconRotation, setIconRotation] = useState(0);
  const [dropdownOptions, setDropdownOptions] = useState<Option[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [paginationState, setPaginationState] = useState({
    pageNumber: 1,
    limit: 10,
    totalRecords: 0,
    search: searchText,
  });
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  const debounce = useDebounced(1000);

  useEffect(() => {
    if (!isOpen) {
      setIsSearchMode(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setHasMore(true);
  }, [searchText]);

  // Memoize the value comparison to avoid complex dependency arrays
  const valueKeyMemo = useMemo(() => (value as Option)?.value, [value]);
  const valueLength = useMemo(() => (value as Option[])?.length, [value]);

  useEffect(() => {
    if (isAsync) return;
    if (isMultiSelect) return;
    const selectedOpt = options.find((opt) => opt?.value === valueKeyMemo);
    setSelectedOption(selectedOpt || null);
  }, [valueKeyMemo, isAsync, isMultiSelect, options]);

  useEffect(() => {
    if (!isAsync) return;
    if (!isMultiSelect) return;
    const selectedOpt = options?.filter((opt) => (value as Option[])?.includes(opt));
    setSelectedOption(selectedOpt || []);
  }, [valueLength, isMultiSelect, isAsync, options, value]);

  useEffect(() => {
    if (value !== undefined) {
      if (isMultiSelect) {
        const newSelected = Array.isArray(value) ? value : [];
        if (JSON.stringify(selectedOption) !== JSON.stringify(newSelected)) {
          setSelectedOption(newSelected);
        }
      } else {
        const newSelected = value || null;
        const areSame =
          (selectedOption === null && newSelected === null) ||
          ((selectedOption as Option)?.label === (newSelected as Option)?.label &&
           (selectedOption as Option)?.value === (newSelected as Option)?.value);

        if (!areSame) {
          setSelectedOption(newSelected);
        }

        if (
          !newSelected ||
          (typeof newSelected === "object" &&
           !(newSelected as Option).label &&
           !(newSelected as Option).value)
        ) {
          setSearchText("");
        }
      }
    }
  }, [value, isMultiSelect, selectedOption]);

  useEffect(() => {
    if (isAsync) return;
    let filteredOptions = [];
    filteredOptions = options.filter(
      (opt) =>
        opt.label &&
        opt.label.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  }, [searchText, options, isAsync]);

  useEffect(() => {
    if (!isAsync) return;
    setFilteredOptions(dropdownOptions);
  }, [dropdownOptions, isAsync]);

  useEffect(() => {
    if (!url || url?.includes("null")) return;

    const params: {
      page: number;
      limit: number;
      name?: string;
    } = {
      page: paginationState.pageNumber,
      limit: paginationState.limit,
    };

    if (paginationState.search) {
      params.name = paginationState.search;
    }
    if (hasMore) {
      dispatch(
        getSelectOptions({
          url,
          params,
          labelKey,
          valueKey,
          labelKey2,
          addOptions,
          handlePaginationChange,
          onHasMoreUpdate: setHasMore,
        })
      );
    }
  }, [
    dispatch,
    url,
    paginationState.pageNumber,
    paginationState.limit,
    paginationState.search,
    labelKey,
    valueKey,
    labelKey2,
    hasMore,
  ]);

  const onCloseCb = () => {
    setIsOpen(false);
    setIsSearchMode(false);
  };

  const onDropdownTouchBottomCb = () => {
    if (!hasMore) return;
    setPaginationState((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
    }));
  };

  const handlePaginationChange = (paginationObj: PaginationObject) => {
    setPaginationState((prev) => ({ ...prev, ...paginationObj }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      if (isMultiSelect) {
        setSelectedOption([]);
        onChangeCb([]);
      } else {
        setSelectedOption(null);
        onChangeCb(null);
      }
    }

    if ((isMultiSelect || isAsync) && e.target.value !== "") {
      setIsSearchMode(true);
    }

    if (e.target.value !== "") {
      debounce(() => {
        setDropdownOptions([]);

        handlePaginationChange({
          pageNumber: 1,
          search: e.target.value,
        });
      });
    }

    setSearchText(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleIconRotation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    if (isMultiSelect || isAsync) {
      if (isSearchMode) {
        setIsSearchMode(false);
        setSearchText("");
      } else {
        setIsSearchMode(true);
        setSearchText("");
      }
    }

    setIconRotation(iconRotation === 180 ? 0 : 180);
    setIsOpen(iconRotation === 180 ? false : true);
  };

  const handleSelectOption = (option: Option | Option[]) => {
    setSelectedOption(option);
    onChangeCb(option);
    setSearchText("");
    setIsSearchMode(false);
    setIsOpen(false);
  };

  const addOptions = (options: Option[]) => {
    setDropdownOptions((prev) => [...prev, ...options]);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const displayValue = useMemo(() => {
    if ((isMultiSelect || isAsync) && isSearchMode) {
      return searchText;
    }

    if ((isMultiSelect || isAsync) && !isSearchMode) {
      if (isMultiSelect && Array.isArray(selectedOption)) {
        return selectedOption.map((opt) => opt.label).join(", ");
      }
      if (
        selectedOption !== null &&
        typeof selectedOption === "object" &&
        "label" in selectedOption
      ) {
        return (selectedOption as Option).label || "";
      }
    }

    if (isOpen && searchText) return searchText;

    if (isMultiSelect && Array.isArray(selectedOption)) {
      return selectedOption.map((opt) => opt.label).join(", ");
    }
    if (
      selectedOption !== null &&
      typeof selectedOption === "object" &&
      "label" in selectedOption
    ) {
      return (selectedOption as Option).label || "";
    }
    if (selectedOption !== null && selectedOption !== undefined) {
      if (typeof selectedOption === 'string' || typeof selectedOption === 'number') {
        const foundOption = options.find((opt) => opt.value === selectedOption);
        return foundOption?.label || "";
      }
    }
    return "";
  }, [
    searchText,
    selectedOption,
    isOpen,
    isMultiSelect,
    isAsync,
    isSearchMode,
    options,
  ]);

  return (
    <div id={id} className={`relative ${customClasses}`}>
      <div>
        <Input
          startIcon={startIcon}
          labelColor={labelColor}
          labelFontSize={labelFontSize}
          label={label}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          endIcon={
            toggleIcon
              ? toggleIcon
              : showToggle && (
                  <div onClick={handleIconRotation} className="cursor-pointer p-1">
                    <ChevronDownIcon
                      className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                )
          }
          onFocus={handleFocus}
          isRequired={isRequired}
          name={name}
          disabled={disabled}
          autoComplete="off"
          error={error || undefined}
        />
      </div>

      <DropdownModal
        isOpen={isOpen}
        onCloseCb={onCloseCb}
        options={filteredOptions}
        isMultiSelect={isMultiSelect}
        multiSelectAll={multiSelectAll}
        selectCb={handleSelectOption}
        selectedOption={selectedOption}
        renderOption={renderOption}
        onDropdownTouchBottomCb={onDropdownTouchBottomCb}
        isAsync={
          isAsync && dropdownOptions.length < paginationState.totalRecords
        }
        disabled={disabled}
        openDirection={openDirection}
        dropdownOptions={dropdownOptions}
        onAddNewCb={onAddNewCb}
        newlyAddedOption={newlyAddedOption}
        isAddNewOption={isAddNewOption}
        addNewOptBtnLable={addNewOptBtnLable}
      />
    </div>
  );
};

export default SelectDropdown; 