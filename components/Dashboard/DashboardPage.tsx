import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { StatisticAPI } from '../../constants/APIUrls';
import {
  GetStatisticDataRes,
  GetStatisticReq,
  StatisticMultipleBarChartData,
  StatisticTableData,
} from '../../types/api/StatisticAPI';
import { Status } from '../../types/Common';
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

const STATISTIC_ID_TOTAL_PEGAWAI = 100001;
const STATISTIC_ID_GOLONGAN = 100002;
const STATISTIC_ID_JENJANG_PENDIDIKAN = 100003;
const STATISTIC_ID_PRIA = 100004;
const STATISTIC_ID_WANITA = 100005;

type DataStatisticTable = Partial<StatisticTableData>;
type DataStatisticMultipleChartBar = Partial<StatisticMultipleBarChartData>;

function Selection({
  options,
  onChange,
  value,
}: {
  options: string[];
  onChange: Dispatch<SetStateAction<string>>;
  value: string;
}) {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate text-sm leading-5 text-gray-700">{value}</span>
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
                {options.map((each, index) => (
                  <Listbox.Option
                    key={`options-${index}`}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={each}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {each}
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
  );
}

function DashboardPage() {
  const [selectedDirectoratGolongan, setSelectedDirectoratGolongan] = useState<string>('');
  const [selectedDirectoratJenjangPendidikan, setSelectedDirectoratJenjangPendidikan] = useState<string>('');
  const [selectedDirectoratByGender, setSelectedDirectoratByGender] = useState<string>('');
  const [dataStatisticTable, setDataStatisticTable] = useState<DataStatisticTable>({});
  const [dataStatisticGolongan, setDataStatisticGolongan] = useState<DataStatisticMultipleChartBar>({});
  const [dataStatisticJenjangPendidikan, setDataStatisticJenjangPendidikan] = useState<DataStatisticMultipleChartBar>(
    {}
  );
  const [dataStatisticByMale, setDataStatisticByMale] = useState<DataStatisticMultipleChartBar>({});
  const [dataStatisticByFemale, setDataStatisticByFemale] = useState<DataStatisticMultipleChartBar>({});

  const [listDirectoratGolongan, setListDirectoratGolongan] = useState<Array<string>>();
  const [listDirectoratJenjangPendidikan, setListDirectoratJenjangPendidikan] = useState<Array<string>>();
  const [listDirectoratByGender, setListDirectoratByGender] = useState<Array<string>>([]);

  const [loaded, setLoaded] = useState<boolean>(false);

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
      callAPI<GetStatisticReq, GetStatisticDataRes>(
        StatisticAPI.GET_STATISTIC_FIND,
        { id: STATISTIC_ID_PRIA, date: '2022-05-24' },
        { method: 'get' }
      ),
      callAPI<GetStatisticReq, GetStatisticDataRes>(
        StatisticAPI.GET_STATISTIC_FIND,
        { id: STATISTIC_ID_WANITA, date: '2022-05-24' },
        { method: 'get' }
      ),
    ]).then(res => {
      let dataStatisticTableRes: DataStatisticTable = {};
      let dataStatisticGolonganRes: DataStatisticMultipleChartBar = {};
      let dataStatisticJenjangPendidikanRes: DataStatisticMultipleChartBar = {};
      let dataStatisticByMaleRes: DataStatisticMultipleChartBar = {};
      let dataStatisticByFemaleRes: DataStatisticMultipleChartBar = {};

      if (res[0].status === 200 && res[0].data && res[0].data?.status === Status.OK) {
        dataStatisticTableRes = { ...dataStatisticTableRes, ...res[0].data.data.data.data };
        setDataStatisticTable(dataStatisticTableRes);
      }
      if (res[1].status === 200 && res[1].data && res[1].data?.status === Status.OK) {
        dataStatisticGolonganRes = { ...dataStatisticGolonganRes, ...res[1].data.data.data.data };
        setDataStatisticGolongan(dataStatisticGolonganRes);

        const UniqueListGolongan = Array.from(
          new Set(dataStatisticGolonganRes?.multiple_bar_charts?.map(item => item['chart_title']))
        );
        if (!selectedDirectoratGolongan && UniqueListGolongan[0]) {
          setListDirectoratGolongan(UniqueListGolongan);
          setSelectedDirectoratGolongan(UniqueListGolongan[0]);
        }
      }
      if (res[2].status === 200 && res[2].data && res[2].data?.status === Status.OK) {
        dataStatisticJenjangPendidikanRes = { ...dataStatisticJenjangPendidikanRes, ...res[2].data.data.data.data };
        setDataStatisticJenjangPendidikan(dataStatisticJenjangPendidikanRes);

        const UniqueListJenjangPendidikan = Array.from(
          new Set(dataStatisticJenjangPendidikanRes?.multiple_bar_charts?.map(item => item['chart_title']))
        );
        if (!selectedDirectoratJenjangPendidikan && UniqueListJenjangPendidikan[0]) {
          setListDirectoratJenjangPendidikan(UniqueListJenjangPendidikan);
          setSelectedDirectoratJenjangPendidikan(UniqueListJenjangPendidikan[0]);
        }
      }
      if (res[3].status === 200 && res[3].data && res[3].data?.status === Status.OK) {
        dataStatisticByMaleRes = { ...dataStatisticByMaleRes, ...res[3].data.data.data.data };
        setDataStatisticByMale(dataStatisticByMaleRes);
        const UniqueListByGender = (dataStatisticByMaleRes?.multiple_bar_charts || []).map(item => item['chart_title']);
        if (!selectedDirectoratByGender && UniqueListByGender[0]) {
          setListDirectoratByGender(UniqueListByGender);
          setSelectedDirectoratByGender(UniqueListByGender[0]);
        }
      }
      if (res[4].status === 200 && res[4].data && res[4].data?.status === Status.OK) {
        dataStatisticByFemaleRes = { ...dataStatisticByFemaleRes, ...res[4].data.data.data.data };
        setDataStatisticByFemale(dataStatisticByFemaleRes);
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

  const totalPegawai = (index: number) => {
    const total = dataStatisticTable?.table?.rows.reduce((sum, i) => sum + parseInt(i[index]), 0);
    return total;
  };

  const GetStatisticGolonganByDirectorat = () => {
    return dataStatisticGolongan?.multiple_bar_charts?.find(item => item.chart_title === selectedDirectoratGolongan);
  };

  const GetStatisticJenjangPendidikanByDirectorat = () => {
    return dataStatisticJenjangPendidikan?.multiple_bar_charts?.find(
      item => item.chart_title === selectedDirectoratJenjangPendidikan
    );
  };

  const GetStatisticGenderByDirectorat = () => {
    return [
      dataStatisticByMale?.multiple_bar_charts?.find(item => item.chart_title === selectedDirectoratByGender),
      dataStatisticByFemale?.multiple_bar_charts?.find(item => item.chart_title === selectedDirectoratByGender),
    ];
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

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Statistik Golongan Pegawai</h3>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2">
              <Selection
                onChange={setSelectedDirectoratGolongan}
                options={listDirectoratGolongan || []}
                value={selectedDirectoratGolongan}
              />
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
              <Selection
                onChange={setSelectedDirectoratJenjangPendidikan}
                options={listDirectoratJenjangPendidikan || []}
                value={selectedDirectoratJenjangPendidikan}
              />
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

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Statistik Umur Dan Gender</h3>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2">
              <Selection
                onChange={setSelectedDirectoratByGender}
                options={listDirectoratByGender || []}
                value={selectedDirectoratByGender}
              />
            </div>
            <p className="text-sm font-light leading-8 text-gray-500">
              Grafik sebaran umur dan gender di masing-masing direktorat
            </p>
            <Bar
              options={options}
              data={{
                labels: GetStatisticGenderByDirectorat()?.[0]?.chart_data?.map(item => item.x_axis),
                datasets: (GetStatisticGenderByDirectorat() || []).map((each, index) => ({
                  label: ['Pria', 'Wanita'][index],
                  data: each?.chart_data?.map(item => item.y_axis),
                  backgroundColor: ['#1c99dc', '#a72881'][index],
                })),
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default withErrorBoundary(DashboardPage);
