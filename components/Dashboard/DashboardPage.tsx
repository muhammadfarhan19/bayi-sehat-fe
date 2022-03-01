import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { Fragment, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
};

const labelsGolongan = [
  'II/A',
  'II/B',
  'II/C',
  'II/D',
  'III/A',
  'III/B',
  'III/C',
  'III/D',
  'IV/A',
  'IV/B',
  'IV/C',
  'IV/D',
];
const totalsGolongan = [10, 30, 70, 20, 90, 115, 145, 130, 168, 109, 190, 26];

const dataGolongan = {
  labels: labelsGolongan,
  datasets: [
    {
      label: 'Golongan',
      data: totalsGolongan,
      backgroundColor: '#4F46E5',
    },
  ],
};

const labelsPendidikan = ['SMA', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3'];
const totalsPendidikan = [60, 70, 90, 120, 190, 150, 80];

const dataPendidikan = {
  labels: labelsPendidikan,
  datasets: [
    {
      label: 'Pendidikan',
      data: totalsPendidikan,
      backgroundColor: '#10B981',
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardPage() {
  const dummyPegawai = [
    {
      unitKerja: 'Direktorat Jenderal Pendidikan Tinggi',
      totalPns: 1,
      totalPpnpn: 0,
    },
    {
      unitKerja: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
      totalPns: 93,
      totalPpnpn: 126,
    },
    {
      unitKerja: 'Direktorat Pembelajaran dan Kemahasiswaan',
      totalPns: 75,
      totalPpnpn: 68,
    },
    {
      unitKerja: 'Direktorat Jenderal Pendidikan Tinggi',
      totalPns: 1,
      totalPpnpn: 0,
    },
    {
      unitKerja: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
      totalPns: 93,
      totalPpnpn: 126,
    },
    {
      unitKerja: 'Direktorat Pembelajaran dan Kemahasiswaan',
      totalPns: 75,
      totalPpnpn: 68,
    },
  ];

  const dummyGolongan = [
    { id: 1, name: 'Direktorat Jenderal Pendidikan Tinggi' },
    { id: 2, name: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi' },
    { id: 3, name: 'Direktorat Pembelajaran dan Kemahasiswaan' },
    { id: 4, name: 'Direktorat Kelembagaan' },
    { id: 5, name: 'Direktorat Sumber Daya' },
    { id: 6, name: 'Direktorat Riset Teknologi dan Pengabdian Masyarakat' },
  ];

  const [selectedGolongan, setSelectedGolongan] = useState(dummyGolongan[1]);
  const [selectedPendidikan, setSelectedPendidikan] = useState(dummyGolongan[1]);

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Data Pegawai</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm text-gray-500">Jumlah Pegawai PNS</dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-700">289 PNS</dd>
              </div>

              <div className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm text-gray-500">Jumlah Pegawai PPNPN</dt>
                <dd className="mt-1 text-3xl font-semibold text-indigo-700">333 PPNPN</dd>
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
                        {dummyPegawai.map((person, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-xs text-gray-500">{person.unitKerja}</td>
                            <td className="whitespace-nowrap px-6 py-4 text-center text-xs text-gray-500">
                              {person.totalPns}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-center text-xs text-gray-500">
                              {person.totalPpnpn}
                            </td>
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
              <Listbox value={selectedGolongan} onChange={setSelectedGolongan}>
                {({ open }) => (
                  <>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="block truncate text-sm leading-5 text-gray-700">{selectedGolongan.name}</span>
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
            <Bar options={options} data={dataGolongan} />
          </div>
        </div>
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Statistik Pendidikan Pegawai</h3>
            <div className="grid grid-cols-1 py-2 sm:grid-cols-2">
              <Listbox value={selectedPendidikan} onChange={setSelectedPendidikan}>
                {({ open }) => (
                  <>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="block truncate text-sm leading-5 text-gray-700">
                          {selectedPendidikan.name}
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
            <Bar options={options} data={dataPendidikan} />
          </div>
        </div>
      </section>
    </>
  );
}
