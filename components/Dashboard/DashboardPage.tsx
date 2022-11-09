import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';

import { StatisticAPI } from '../../constants/APIUrls';
import { GetStatisticDataRes, GetStatisticReq, StatisticTableData } from '../../types/api/StatisticAPI';
import { Status } from '../../types/Common';
import { classNames } from '../../utils/Components';
import { callAPI } from '../../utils/Fetchers';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import Loader from '../shared/Loader/Loader';
import Graph from './Graph';
import TwoGraph from './TwoGraph';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const tabs = ['Data PNS', 'Data PPNPN'];

const dateNowStr = new Date().toISOString().slice(0, 10);

/** PNS */
const STATISTIC_ID_TOTAL_PEGAWAI = 100001;
const STATISTIC_ID_GOLONGAN = 100002;
const STATISTIC_ID_JENJANG_PENDIDIKAN = 100003;
const STATISTIC_ID_PRIA = 100004;
const STATISTIC_ID_WANITA = 100005;
const STATISTIC_ID_TUGAS_IJIN = 100006;

/** PPNPN */
const STATISTIC_ID_PRIA_PPNPN = 100007;
const STATISTIC_ID_WANITA_PPNPN = 100008;
const STATISTIC_ID_JENJANG_PENDIDIKAN_PPNPN = 100009;

type DataStatisticTable = Partial<StatisticTableData>;

function DashboardPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const [dataStatisticTable, setDataStatisticTable] = useState<DataStatisticTable>({});

  React.useEffect(() => {
    getStatiscticData();
  }, []);

  const getStatiscticData = async () => {
    const apiReqTotalPegawai = {
      id: STATISTIC_ID_TOTAL_PEGAWAI,
      date: dateNowStr,
    };

    callAPI<GetStatisticReq, GetStatisticDataRes>(StatisticAPI.GET_STATISTIC_FIND, apiReqTotalPegawai, {
      method: 'get',
    }).then(res => {
      let dataStatisticTableRes: DataStatisticTable = {};

      if (res.status === 200 && res.data && res.data?.status === Status.OK) {
        dataStatisticTableRes = { ...dataStatisticTableRes, ...res.data.data.data.data };
        setDataStatisticTable(dataStatisticTableRes);
      }
      setLoaded(true);
    });
  };

  if (!loaded) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  const isPNS = selectedTab === 'Data PNS';
  const typePegawai = isPNS ? 'pns' : 'ppnpn';
  const totalPegawai = (index: number) => {
    const total = dataStatisticTable?.table?.rows.reduce((sum, i) => sum + parseInt(i[index]), 0);
    return total;
  };

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Data Pegawai</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm text-gray-500">Jumlah Pegawai PNS</dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-700">{totalPegawai(2)} PNS</dd>
              </div>

              <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm text-gray-500">Jumlah Pegawai PPNPN</dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-700">{totalPegawai(3)} PPNPN</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500">No</th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500"
                          >
                            Unit Kerja
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500"
                          >
                            Pegawai PNS
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs uppercase tracking-wider text-gray-500"
                          >
                            Pegawai PPNPN
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {dataStatisticTable?.table?.rows.map((row, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 text-xs text-gray-500">{index + 1}</td>
                            <td className="px-6 py-4 text-xs text-gray-500">{row[1]}</td>
                            <td className="px-6 py-4 text-center text-xs text-gray-500">{row[2]}</td>
                            <td className="px-6 py-4 text-center text-xs text-gray-500">{row[3]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="filter">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map(tab => (
              <span
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={classNames(
                  tab === selectedTab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'cursor-pointer border-b-2 py-4 px-1 text-sm font-medium'
                )}
              >
                {tab}
              </span>
            ))}
          </nav>
        </div>
      </section>

      {isPNS && (
        <Graph
          typePegawai={typePegawai}
          bgColor="#4F46E5"
          dateNowStr={dateNowStr}
          id={STATISTIC_ID_GOLONGAN}
          label="Golongan"
          title="Statistik Golongan Pegawai"
          typeChart="golongan"
        />
      )}

      <Graph
        typePegawai={typePegawai}
        bgColor="#10B981"
        dateNowStr={dateNowStr}
        id={isPNS ? STATISTIC_ID_JENJANG_PENDIDIKAN : STATISTIC_ID_JENJANG_PENDIDIKAN_PPNPN}
        label="Pendidikan"
        title="Statistik Pendidikan Pegawai"
        typeChart="pendidikan"
      />

      <TwoGraph
        typePegawai={typePegawai}
        bgColor={['#1c99dc', '#a72881']}
        dateNowStr={dateNowStr}
        ids={isPNS ? [STATISTIC_ID_PRIA, STATISTIC_ID_WANITA] : [STATISTIC_ID_PRIA_PPNPN, STATISTIC_ID_WANITA_PPNPN]}
        labels={['Pria', 'Wanita']}
        title="Statistik Umur Dan Gender"
        typeChart="jenis_kelamin"
      />

      {isPNS && (
        <Graph
          typePegawai={typePegawai}
          bgColor="#4F46E5"
          bgColorSecond="#10B981"
          dateNowStr={dateNowStr}
          id={STATISTIC_ID_TUGAS_IJIN}
          label="Jenis belajar"
          labelMap={['Tugas Belajar', 'Izin Belajar']}
          title="Statistik Tugas Belajar dan Izin Belajar"
          typeChart="jenis_belajar"
          joinChart={true}
        />
      )}
    </>
  );
}

export default withErrorBoundary(DashboardPage);
