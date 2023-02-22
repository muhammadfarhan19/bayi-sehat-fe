import React from 'react';

import { classNames } from '../../../utils/Components';
import { tabs } from '../../DinasPage/DataPegawai/DataDinasPegawai';
import usePersonalData from '../../shared/hooks/usePersonalData';
import ListPegawaiPNS from './ListPegawaiPNS';
import ListPegawaiPPNPN from './ListPegawaiPPNPN';

function RekapKehadiranAdminPage() {
  const [selected, setSelected] = React.useState('Master PNS');
  const personalPegawai = usePersonalData();
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            defaultValue={selected}
          >
            {tabs.map(tab => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(tab => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setSelected(tab.name)}
                  className={classNames(
                    tab.name === selected
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div>
        {selected === 'Master PNS' ? (
          <ListPegawaiPNS unit_kerja_id={Number(personalPegawai?.unit_kerja_id)} />
        ) : (
          <ListPegawaiPPNPN unit_kerja_id={Number(personalPegawai?.unit_kerja_id)} />
        )}
      </div>
    </div>
  );
}

export default RekapKehadiranAdminPage;
