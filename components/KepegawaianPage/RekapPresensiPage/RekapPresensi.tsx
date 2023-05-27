import React from 'react';

import { type PegawaiData } from '../../../types/api/KepegawaianAPI';
import { classNames } from '../../../utils/Components';
import { tabs } from '../../DinasPage/DataPegawai/DataDinasPegawai';
import usePersonalData from '../../shared/hooks/usePersonalData';
import { RekapPresensiDetail } from './DetailPage';
import { ListPegawaiPNS, ListPegawaiPPNPN } from './Shared';
import { type TabName } from './Shared/types/_sharedType';

function RekapPresensi() {
  const [selected, setSelected] = React.useState<string | TabName>('Master PNS');
  const personalData = usePersonalData();

  const [pegawaiData, setPegawaiData] = React.useState<PegawaiData>();

  const handleSelectEachPegawai = (data: PegawaiData) => setPegawaiData(data);

  const isActiveTabPNS = (selected as TabName) === 'Master PNS';
  const isActiveTabPPNPN = (selected as TabName) === 'Master PPNPN';
  const isPNS = 1;
  const isPPNPN = 2;

  const isPegawaiDataAvail = pegawaiData !== undefined;
  const isSelectedPNS = isPegawaiDataAvail && pegawaiData.status_cpns === isPNS;
  const isSelectedPPNPN = isPegawaiDataAvail && pegawaiData.status_cpns === isPPNPN;

  const handleBack = () => setPegawaiData(undefined);

  const renderComponent =
    isActiveTabPNS && !isPegawaiDataAvail ? (
      <ListPegawaiPNS
        CTATitle="Detail"
        onSelectEachPegawai={handleSelectEachPegawai}
        pageTitle="Rekap Presensi"
        unit_kerja_id={Number(personalData?.unit_kerja_id)}
      />
    ) : isActiveTabPNS && isSelectedPNS ? (
      <RekapPresensiDetail onBack={handleBack} detailPegawai={pegawaiData} />
    ) : isActiveTabPPNPN && !isPegawaiDataAvail ? (
      <ListPegawaiPPNPN
        CTATitle="Detail"
        onSelectEachPegawai={handleSelectEachPegawai}
        pageTitle="Rekap Presensi"
        unit_kerja_id={Number(personalData?.unit_kerja_id)}
      />
    ) : isActiveTabPPNPN && isSelectedPPNPN ? (
      <RekapPresensiDetail onBack={handleBack} detailPegawai={pegawaiData} />
    ) : null;

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
                  onClick={() => {
                    setSelected(tab.name);
                    if (pegawaiData?.user_id) {
                      setPegawaiData(undefined);
                    }
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
      {renderComponent}
    </div>
  );
}

export default RekapPresensi;
