import React from 'react';

import { StatusHadirRekapPresensi } from '../../../../../constants/Resource';

interface StatusHadirPickerProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function StatusHadirPicker() {
  const renderComponent = (props: StatusHadirPickerProps) => {
    const onChangeHandler = props.onChange;
    return (
      <div className="w-[202px] pb-2">
        <p className="mb-[4px] text-[14px] font-normal">Status Hadir</p>
        <select
          className="block w-full appearance-none truncate rounded-md border border-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
          onChange={onChangeHandler}
        >
          <option value="">Semua</option>
          {(StatusHadirRekapPresensi || []).map((item, index) => (
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

export default StatusHadirPicker;
