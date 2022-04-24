import { AdjustmentsIcon } from '@heroicons/react/solid';
import React from 'react';

import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import AutoComplete from '../shared/Input/ComboBox';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination';

const dummyUnit = [
  'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
  'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
];
const dummyYear = ['2017', '2018', '2019', '2020', '2021', '2022'];
const dummyMonth = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const dummyStatus = ['Eligible', 'Tidak Eligible'];

const dummyList = [
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
  {
    nip: '196612251987022001',
    name: 'Aan Sriwidayati',
    unit: 'Sekretariat Direktorat Jenderal Pendidikan Tinggi',
    gol: 'III/d',
    tmt_mk_awal: '2017-04-01, 25 thn 2 bln',
    tmt_mk_baru: '2021-10-01, 29 thn 8 bln',
    notes: 'SUDAH MAKSIMAL',
    pegajuan: 'Diproses',
  },
];

function Kepangkatan() {
  const [showAdvancedFilter, setshowAdvancedFilter] = React.useState(false);

  const toggleAdvancedFilter = () => {
    const showState = !showAdvancedFilter;
    setshowAdvancedFilter(showState);
  };

  return (
    <>
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Monitoring Data Kenaikan Pangkat</p>

          <div className="ml-auto flex">
            <input
              onChange={event => {
                console.log(event);
              }}
              autoComplete="off"
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
            />
            <button
              className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
              onClick={toggleAdvancedFilter}
            >
              <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
            </button>
          </div>
        </div>

        {showAdvancedFilter && (
          <>
            <div className="flex w-full flex-row">
              <div className="w-full pb-5">
                <AutoComplete
                  onChange={value => {
                    console.log(value);
                  }}
                  label={'Pilih'}
                  defaultValue={{ text: 'Semua', value: '*' }}
                  options={(() => {
                    const returnList = ['Jabatan Fungsional'].map(each => ({
                      text: each,
                      value: each,
                    }));
                    returnList.unshift({ text: 'Semua', value: '*' });
                    return returnList;
                  })()}
                />
              </div>
            </div>
            <div className="flex w-full flex-row gap-x-[16px]">
              <div className="w-[202px] pb-2">
                <AutoComplete
                  onChange={value => {
                    console.log(value);
                  }}
                  label={'Tahun'}
                  defaultValue={{ text: 'Semua', value: '*' }}
                  options={(() => {
                    const returnList = dummyYear.map(each => ({
                      text: each,
                      value: each,
                    }));
                    returnList.unshift({ text: 'Semua', value: '*' });
                    return returnList;
                  })()}
                />
              </div>
              <div className="w-[202px] pb-2">
                <AutoComplete
                  label={'Bulan'}
                  onChange={value => {
                    console.log(value);
                  }}
                  defaultValue={{ text: 'Semua', value: '*' }}
                  options={dummyMonth.map(each => ({
                    text: each,
                    value: each,
                  }))}
                />
              </div>
              <div className="w-[202px] pb-2">
                <AutoComplete
                  label={'Unit Kerja'}
                  onChange={value => {
                    console.log(value);
                  }}
                  defaultValue={{ text: 'Semua', value: '*' }}
                  options={dummyUnit.map(each => ({
                    text: each,
                    value: each,
                  }))}
                />
              </div>
              <div className="w-[202px] pb-2">
                <AutoComplete
                  label={'Status'}
                  onChange={value => {
                    console.log(value);
                  }}
                  defaultValue={{ text: 'Semua', value: '*' }}
                  options={dummyStatus.map(each => ({
                    text: each,
                    value: each,
                  }))}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {!dummyList ? (
        <div className="relative h-[150px] w-full divide-y divide-gray-200">
          <Loader />
        </div>
      ) : (
        <div className="flex">
          <div className="my-[24px] overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="overflow-hidden sm:rounded-lg">
                <table className="w-full table-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        NIP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Unit Kerja
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Gol
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        tmt, mk awal
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        TMT, MK baru
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Notes
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Pengajuan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyList.map((data, dataIdx) => (
                      <tr
                        key={dataIdx}
                        className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        <td className="font-regular px-6 text-xs text-gray-500">{data.nip}</td>
                        <td className="font-regular px-6 text-xs text-indigo-600">
                          <a href={`#`}>{data.name}</a>
                        </td>
                        <td className="font-regular px-6 text-xs text-gray-500">{data.unit}</td>
                        <td className="font-regular px-6 py-4 text-xs text-gray-500">{data.gol}</td>
                        <td className="font-regular px-6 py-4 text-xs text-gray-500">{data.tmt_mk_awal}</td>
                        <td className="font-regular px-6 text-xs text-gray-500">{data.tmt_mk_baru}</td>
                        <td className="font-regular px-6 py-4 text-xs text-gray-500">{data.notes}</td>
                        <td className="font-regular px-6 py-4 text-xs text-gray-500">
                          <a
                            href={`#`}
                            className="rounded-[4px] bg-indigo-600 px-[11px] py-[7px] text-xs font-medium text-gray-50 focus:outline-none"
                          >
                            {data.pegajuan}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  onChange={value => {
                    console.log(value);
                  }}
                  totalData={dummyList.length}
                  perPage={20}
                  page={1}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withErrorBoundary(Kepangkatan);
