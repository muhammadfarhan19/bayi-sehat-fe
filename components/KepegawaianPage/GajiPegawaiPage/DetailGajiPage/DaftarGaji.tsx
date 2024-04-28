import React from 'react';

import { classNames } from '../../../../utils/Components';
// import { tabs } from '../../../DinasPage/DataPegawai/DataDinasPegawai';
import { type TabName } from '../../RekapPresensiPage/Shared/types/_sharedType';
import DaftarGajiDetail from './DaftarGajiDetail';
import DaftarGajiList from './DaftarGajiList';
import ResumeGajiDetail from './ResumeDetailGaji';
import SummaryGajiDetail from './SummaryDetailGaji';

function DaftarTransaksi() {
  const [selected, setSelected] = React.useState<string | TabName>('Master PPNPN');

  const [detailPage, setDetailPage] = React.useState<{ show: boolean; date?: Date; code?: string; type?: string }>({
    show: false,
    date: undefined,
    code: undefined,
    type: undefined,
  });

  const handleShowDetail = (show: boolean, date?: Date, code?: string, type?: string) => {
    return setDetailPage({
      show,
      date,
      code,
      type,
    });
  };

  const handleBack = () => {
    return setDetailPage({
      show: false,
      date: undefined,
      code: undefined,
    });
  };

  const handleChangeTab = (name: string) => {
    if (detailPage.show) {
      handleBack();
    }
    setSelected(name);
  };

  const tabs = [{ name: 'Master PPNPN', href: '#' }];

  return (
    <>
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
                  onClick={() => {
                    handleChangeTab(tab.name);
                  }}
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
      {detailPage.show ? (
        <>
          {detailPage.type === 'transaction_detail' && (
            <DaftarGajiDetail
              selectedTab={selected}
              code={detailPage?.code}
              selectedDate={detailPage?.date}
              onBack={handleBack}
            />
          )}
          {detailPage.type === 'resume_detail' && (
            <ResumeGajiDetail
              selectedTab={selected}
              code={detailPage?.code}
              selectedDate={detailPage?.date}
              onBack={handleBack}
            />
          )}
          {detailPage.type === 'summary_detail' && (
            <SummaryGajiDetail
              selectedTab={selected}
              code={detailPage?.code}
              selectedDate={detailPage?.date}
              onBack={handleBack}
            />
          )}
        </>
      ) : (
        <DaftarGajiList onShowDetail={handleShowDetail} selectedTab={selected} />
      )}
    </>
  );
}

export default DaftarTransaksi;
