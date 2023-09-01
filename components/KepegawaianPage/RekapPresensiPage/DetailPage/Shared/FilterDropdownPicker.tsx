import React from 'react';

interface FilterDropdownPickerProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  textLabel?: string;
  dataSet: string[];
  unMappedOptionTitle?: string;
}

function FilterDropdownPicker() {
  const renderComponent = (props: FilterDropdownPickerProps) => {
    const {
      textLabel = 'Edit this Label by passing `textLabel` properties',
      dataSet,
      unMappedOptionTitle = 'Semua',
    } = props;
    const onChangeHandler = props.onChange;
    return (
      <div className="w-[202px] pb-2">
        <p className="mb-[4px] text-[14px] font-normal">{textLabel}</p>
        <select
          className="block w-full appearance-none truncate rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
          onChange={onChangeHandler}
        >
          <option value="">{unMappedOptionTitle}</option>
          {(dataSet || []).map((item, index) => (
            <option key={`options-${index}`} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return {
    renderComponent,
  };
}

export default FilterDropdownPicker;
