import React, { useEffect, useMemo, useRef, useState } from "react";
import Checkbox from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import { BUTTON_VARIANTS } from "../button/Button";
import Icons from "../icons/Icons";
import { DropdownModalProps, Option } from "../../types/selectDropdown";

// Mock constants - you'll need to replace these with actual imports
const SOZEN_COLORS = {
  GRAY: "#6B7280"
};

// Helper function to replace General.toggleObjectInArray
const toggleObjectInArray = (array: Option[] = [], object: Option = {} as Option, property: string = "") => {
  const arrayClone = [...array];
  const index = arrayClone.findIndex(item => (item as any)[property] === (object as any)[property]);

  if (index !== -1) {
    arrayClone.splice(index, 1);
  } else {
    arrayClone.push(object);
  }

  return arrayClone;
};

const DropdownModal: React.FC<DropdownModalProps> = ({
  options = [],
  isOpen = false,
  onCloseCb = () => {},
  selectCb = () => {},
  selectedOption = null,
  isMultiSelect = false,
  onMouseLeaveCb = () => {},
  renderOption,
  onDropdownTouchBottomCb = () => {},
  disabled = false,
  openDirection = "bottom",
  multiSelectAll = false,
  onAddNewCb = null,
  newlyAddedOption = {} as Option,
  isAddNewOption = false,
  addNewOptBtnLable = "",
  styleprops,
  id,
}) => {
  const [multiSelectValues, setMultiSelectValues] = useState<Option[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const allOptions = useMemo(() => {
    if (isAddNewOption && newlyAddedOption) {
      const exists = options.some(
        (opt) => opt.value === newlyAddedOption.value
      );
      return exists ? options : [...options, newlyAddedOption];
    }
    return options;
  }, [options, isAddNewOption, newlyAddedOption]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onCloseCb();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onCloseCb]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        onDropdownTouchBottomCb(entry?.isIntersecting);
      }
    });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [allOptions.length, onDropdownTouchBottomCb]);

  useEffect(() => {
    if (Array.isArray(selectedOption)) {
      setMultiSelectValues(selectedOption);
    }
  }, [selectedOption]);

  const handleMultiSelectChange = (value: Option) => {
    const updatedArray = toggleObjectInArray(
      multiSelectValues,
      value,
      "value"
    );
    setMultiSelectValues(updatedArray);
  };

  if (!isOpen) return null;

  return (
    <div
      id={id}
      ref={modalRef}
      onMouseLeave={onMouseLeaveCb}
      className={`absolute z-[9999] mt-1 ${
        styleprops ? "w-[148px]" : "w-full"
      } bg-white rounded-md shadow-sm right-0 max-h-[250px] overflow-hidden ${
        openDirection === "top" && "bottom-[50px]"
      }`}
    >
      <div
        id="dropdown-modal-options-container"
        className="max-h-[200px] overflow-y-auto"
      >
        {allOptions.length > 0 ? (
          <>
            {multiSelectAll && (
              <Button
                id="dropdown-modal-select-all"
                variant={BUTTON_VARIANTS.TEXT}
                className="w-full bg-gray-100 rounded-md !text-black !justify-start"
                onClickCb={() => {
                  if (multiSelectValues.length === allOptions.length) {
                    setMultiSelectValues([]);
                  } else {
                    setMultiSelectValues(allOptions);
                  }
                }}
              >
                <Checkbox
                  id="dropdown-modal-select-all-checkbox"
                  checked={multiSelectValues.length === allOptions.length}
                />
                Select All
              </Button>
            )}

            {isAddNewOption && newlyAddedOption && (
              <div id="dropdown-modal-add-new" className="p-1 flex items-end">
                <Button
                  id="dropdown-modal-add-new-btn"
                  variant={BUTTON_VARIANTS.CONTAINED}
                  className="w-full flex item-end px-4 py-2 hover:bg-gray-100 text-blue-600 font-medium"
                  onClickCb={onAddNewCb || (() => {})}
                >
                  <Icons iconName="addIcon" color={SOZEN_COLORS.GRAY} />
                  {addNewOptBtnLable}
                </Button>
              </div>
            )}

            {allOptions?.map((option, index) => {
              const content = isMultiSelect ? (
                <Button
                  id={`dropdown-modal-option-${option?.value || index}`}
                  variant={BUTTON_VARIANTS.TEXT}
                  className="w-full hover:bg-gray-100 rounded-md !text-black !justify-start"
                  onClickCb={() => handleMultiSelectChange(option)}
                >
                  {option?.value && (
                    <Checkbox
                      id={`dropdown-modal-option-checkbox-${
                        option?.value || index
                      }`}
                      checked={multiSelectValues.some(
                        (val) => val.value === option?.value
                      )}
                    />
                  )}
                  {option.iconName && <Icons iconName={option.iconName} />}
                  {option.label}
                </Button>
              ) : (
                renderOption?.(option, selectCb) ?? (
                  <Button
                    id={`dropdown-modal-option-${option?.value || index}`}
                    variant={BUTTON_VARIANTS.TEXT}
                    className="w-full hover:bg-gray-100 rounded-md !text-black !justify-start"
                    onClickCb={() => selectCb(option)}
                    disabled={disabled}
                  >
                    {option.iconName && <Icons iconName={option.iconName} />}
                    {option.label}
                  </Button>
                )
              );

              return (
                <div
                  key={`select-dropdown-modal-option-${option?.value || index}`}
                >
                  {content}
                </div>
              );
            })}

            <div
              id="dropdown-modal-end-spacer"
              ref={lastItemRef}
              className="h-1"
            />
          </>
        ) : (
          <div
            id="dropdown-modal-empty"
            className="cursor-pointer py-2 px-4 text-gray-500"
          >
            No Result Found
          </div>
        )}
      </div>

      {isMultiSelect && (
        <div
          id="dropdown-modal-footer"
          className="flex justify-end sticky bottom-0 bg-white p-2"
        >
          <Button
            id="dropdown-modal-done-button"
            variant={BUTTON_VARIANTS.CONTAINED}
            className="font-bold"
            onClickCb={() => {
              selectCb(multiSelectValues);
              onCloseCb();
            }}
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
};

export default DropdownModal; 