import { Combobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import React from 'react';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import { classNames } from '../../../utils/Components';
import useCommonApi from '../hooks/useCommonApi';

export default function AutoCompletePegawai(props) {
  const { onChange } = props;
  const [selectedValue] = React.useState('');
  const [filter, setFilter] = React.useState({
    page: 1,
    per_page: 20,
  });

  const { data: pegawaiList } = useCommonApi(KepegawaianAPI.GET_PEGAWAI_LIST, filter, { method: 'GET' });

  const handleOnChange = comboBoxValue => {
    onChange(comboBoxValue);
  };

  const search = async (type, value) => {
    const newState = { ...filter };
    newState[type] = value;
    setFilter(newState);
  };

  return (
    <Combobox as="div" value={selectedValue} onChange={handleOnChange}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">{'Pegawai'}</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={e => search('nama', e.target.value)}
          autoComplete={'off'}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {pegawaiList !== undefined && pegawaiList?.list.length ? (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {(pegawaiList?.list || []).map((each, index) => (
              <Combobox.Option
                key={index}
                value={each.name + '|' + each.pegawai_id}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected ? 'font-semibold' : '')}>
                      {each.name}
                      {' - '}
                      {each.unit_kerja}
                    </span>
                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option
              value={''}
              className={({ active }) =>
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                )
              }
            >
              {({ selected }) => (
                <>
                  <span className={classNames('block truncate', selected ? 'font-semibold' : '')}>
                    {'Data tidak ditemukan'}
                  </span>
                </>
              )}
            </Combobox.Option>
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
