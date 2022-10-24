import React from 'react';

import { classNames } from '../../../utils/Components';
import ShiftPns from './ShiftPNS/ShiftPns';
import ShiftPpnpn from './ShiftPPNPN/ShiftPpnpn';

export default function ShiftKepegawaian() {
  const tabs = [
    { name: 'PNS', href: '#' },
    { name: 'PPNPN', href: '#' },
  ];

  const [selected, setSelected] = React.useState('PNS');

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
      <div>{selected === 'PNS' ? <ShiftPns /> : <ShiftPpnpn />}</div>
    </div>
  );
}
