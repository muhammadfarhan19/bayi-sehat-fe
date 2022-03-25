import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { Fragment, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { StatisticAPI } from '../../constants/APIUrls';
import { Status } from '../../types/Common';
import {
  GetStatisticDataRes,
  GetStatisticReq,
  StatisticMultipleBarChartData,
  StatisticTableData,
} from '../../types/StatisticAPI';
import { callAPI, callAPIParallel } from '../../utils/Fetchers';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import Loader from '../shared/Loader/Loader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const options = {
  responsive: true,
};

const dummyGolongan = [
  { id: 1, name: 'Direktorat Jenderal Pendidikan Tinggi' },
  { id: 2, name: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi' },
  { id: 3, name: 'Direktorat Pembelajaran dan Kemahasiswaan' },
  { id: 4, name: 'Direktorat Kelembagaan' },
  { id: 5, name: 'Direktorat Sumber Daya' },
  { id: 6, name: 'Direktorat Riset Teknologi dan Pengabdian Masyarakat' },
];

const STATISTIC_ID_TOTAL_PEGAWAI = 100001;
const STATISTIC_ID_GOLONGAN = 100002;
const STATISTIC_ID_JENJANG_PENDIDIKAN = 100003;

type DataStatisticTable = Partial<StatisticTableData>;
type DataStatisticMultipleChartBar = Partial<StatisticMultipleBarChartData>;

function DashboardPage() {
  const [throwError, setThrowError] = useState<string>('');
  const [selectedDirectoratGolongan, setSelectedDirectoratGolongan] = useState(dummyGolongan[0]);
  const [selectedDirectoratJenjangPendidikan, setSelectedDirectoratJenjangPendidikan] = useState(dummyGolongan[0]);
  const [dataStatisticTable, setDataStatisticTable] = useState<DataStatisticTable>({});
  const [dataStatisticGolongan, setDataStatisticGolongan] = useState<DataStatisticMultipleChartBar>({});
  const [dataStatisticJenjangPendidikan, setDataStatisticJenjangPendidikan] = useState<DataStatisticMultipleChartBar>(
    {}
  );

  React.useEffect(() => {
    getStatiscticData();
  }, []);

  const getStatiscticData = async () => {
    const dateNowStr = new Date().toISOString().slice(0, 10);
    const apiReqTotalPegawai = {
      id: STATISTIC_ID_TOTAL_PEGAWAI,
      date: dateNowStr,
    };

    const apiReqGolongan = {
      id: STATISTIC_ID_GOLONGAN,
      date: dateNowStr,
    };

    const apiReqJenjangPendidikan = {
      id: STATISTIC_ID_JENJANG_PENDIDIKAN,
      date: dateNowStr,
    };

    await callAPIParallel(() => [
      callAPI<GetStatisticReq, GetStatisticDataRes>(StatisticAPI.GET_STATISTIC_FIND, apiReqTotalPegawai, {
        method: 'get',
      }),
      callAPI<GetStatisticReq, GetStatisticDataRes>(StatisticAPI.GET_STATISTIC_FIND, apiReqGolongan, { method: 'get' }),
      callAPI<GetStatisticReq, GetStatisticDataRes>(StatisticAPI.GET_STATISTIC_FIND, apiReqJenjangPendidikan, {
        method: 'get',
      }),
    ]).then(res => {
      let dataStatisticTableRes: DataStatisticTable = {};
      let dataStatisticGolonganRes: DataStatisticMultipleChartBar = {};
      let dataStatisticJenjangPendidikanRes: DataStatisticMultipleChartBar = {};

      if (res[0].status === 200 && res[0].data && res[0].data?.status === Status.OK) {
        dataStatisticTableRes = { ...dataStatisticTableRes, ...res[0].data.data.data.data };
      }
      if (res[1].status === 200 && res[1].data && res[1].data?.status === Status.OK) {
        dataStatisticGolonganRes = { ...dataStatisticGolonganRes, ...res[1].data.data.data.data };
      }
      if (res[2].status === 200 && res[2].data && res[2].data?.status === Status.OK) {
        dataStatisticJenjangPendidikanRes = { ...dataStatisticJenjangPendidikanRes, ...res[2].data.data.data.data };
      }

      if (
        Object.keys(dataStatisticTableRes).length &&
        Object.keys(dataStatisticGolonganRes).length &&
        Object.keys(dataStatisticJenjangPendidikanRes).length
      ) {
        setDataStatisticTable(dataStatisticTableRes);
        setDataStatisticGolongan(dataStatisticGolonganRes);
        setDataStatisticJenjangPendidikan(dataStatisticJenjangPendidikanRes);
      } else {
        setThrowError('Failed to fetch the data');
      }
    });
  };

  if (throwError) {
    throw throwError;
  }

  if (!Object.keys(dataStatisticTable).length) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  const totalPegawai = (index: number) => {
    const total = dataStatisticTable?.table?.rows.reduce((sum, i) => sum + parseInt(i[index]), 0);
    return total;
  };

  const GetStatisticGolonganByDirectorat = () => {
    return dataStatisticGolongan?.multiple_bar_charts?.find(
      item => item.chart_title === selectedDirectoratGolongan.name
    );
  };

  const GetStatisticJenjangPendidikanByDirectorat = () => {
    return dataStatisticJenjangPendidikan?.multiple_bar_charts?.find(
      item => item.chart_title === selectedDirectoratJenjangPendidikan.name
    );
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
                            <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{row[1]}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center text-xs text-gray-500">{row[2]}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center text-xs text-gray-500">{row[3]}</td>
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

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Statistik Golongan Pegawai</h3>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2">
              <Listbox value={selectedDirectoratGolongan} onChange={setSelectedDirectoratGolongan}>
                {({ open }) => (
                  <>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="block truncate text-sm leading-5 text-gray-700">
                          {selectedDirectoratGolongan.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {dummyGolongan.map(person => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                  >
                                    {person.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <p className="text-sm font-light leading-8 text-gray-500">
              Grafik sebaran pegawai di unit kerja sekretariat direktorat jenderal pendidikan tinggi
            </p>
            <Bar
              options={options}
              data={{
                labels: GetStatisticGolonganByDirectorat()?.chart_data?.map(item => item.x_axis),
                datasets: [
                  {
                    label: 'Golongan',
                    data: GetStatisticGolonganByDirectorat()?.chart_data?.map(item => item.y_axis),
                    backgroundColor: '#4F46E5',
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Statistik Pendidikan Pegawai</h3>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2">
              <Listbox value={selectedDirectoratJenjangPendidikan} onChange={setSelectedDirectoratJenjangPendidikan}>
                {({ open }) => (
                  <>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="block truncate text-sm leading-5 text-gray-700">
                          {selectedDirectoratJenjangPendidikan.name}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {dummyGolongan.map(person => (
                            <Listbox.Option
                              key={person.id}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                  >
                                    {person.name}
                                  </span>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <p className="text-sm font-light leading-8 text-gray-500">
              Grafik sebaran pegawai di unit kerja sekretariat direktorat jenderal pendidikan tinggi
            </p>
            <Bar
              options={options}
              data={{
                labels: GetStatisticJenjangPendidikanByDirectorat()?.chart_data?.map(item => item.x_axis),
                datasets: [
                  {
                    label: 'Pendidikan',
                    data: GetStatisticJenjangPendidikanByDirectorat()?.chart_data?.map(item => item.y_axis),
                    backgroundColor: '#10B981',
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default withErrorBoundary(DashboardPage);
