import React from 'react';

import { JabatanAPI, MasterAPI } from '../../../constants/APIUrls';
import { GetJabatanReq, JabatanData } from '../../../types/api/JabatanAPI';
import { JenisJabatanListData } from '../../../types/api/MasterAPI';
import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../shared/hooks/useCommonApi';
import AutoComplete from '../../shared/Input/ComboBox';

function RekapDinasPage() {
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [loaded, setLoaded] = React.useState(false);
  const [filterState, setFilterState] = React.useState<GetJabatanReq>({
    page: 1,
    per_page: 20,
  });

  const { mutate } = useCommonApi<GetJabatanReq, JabatanData>(JabatanAPI.GET_JABATAN, filterState, { method: 'GET' });

  const { data: jenisJabatanList } = useCommonApi<null, JenisJabatanListData[]>(
    MasterAPI.GET_JENIS_JABATAN_LIST,
    null,
    { method: 'GET' }
  );

  React.useEffect(() => {
    if (loaded) {
      mutate();
    }
    setLoaded(true);
  }, [filterState]);

  const changeFilterState = (inputState: Partial<GetJabatanReq>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState), pageAffected ? 0 : 800);
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Rekap Dinas</p>

            <div className="ml-auto flex">
              <input
                autoComplete="off"
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari Penugasan"
              />
              <div className="flex w-full">
                <button
                  className="ml-1 inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={() => (window.location.href = '/kepegawaian/rekap-dinas?type=add')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tambah Dinas
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <AutoComplete
                onChange={value => {
                  changeFilterState({ jenis_jabatan: value.value === '*' ? undefined : Number(value.value) });
                }}
                label={'Unit Kerja'}
                defaultValue={{ text: 'Semua', value: '*' }}
                options={(() => {
                  const returnList = (jenisJabatanList || []).map(each => ({
                    text: each.jenis_jabatan,
                    value: String(each.id),
                  }));
                  returnList.unshift({ text: 'Semua', value: '*' });
                  return returnList;
                })()}
              />
            </div>
            <div className="w-[202px] pb-2">
              <AutoComplete
                label={'Jenis Dinas'}
                onChange={value => {
                  changeFilterState({ kelas_jabatan: value.value === '*' ? undefined : Number(value.value) });
                }}
                defaultValue={{ text: 'Semua', value: '*' }}
                options={['*', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(each => ({
                  text: each === '*' ? 'Semua' : String(each),
                  value: String(each),
                }))}
              />
            </div>
            <div className="w-[202px] pb-2">
              <AutoComplete
                label={'Dari tanggal'}
                onChange={value => {
                  changeFilterState({ kelas_jabatan: value.value === '*' ? undefined : Number(value.value) });
                }}
                defaultValue={{ text: 'Semua', value: '*' }}
                options={['*', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(each => ({
                  text: each === '*' ? 'Semua' : String(each),
                  value: String(each),
                }))}
              />
            </div>
            <div className="w-[202px] pb-2">
              <AutoComplete
                label={'Sampai Tanggal'}
                onChange={value => {
                  changeFilterState({ kelas_jabatan: value.value === '*' ? undefined : Number(value.value) });
                }}
                defaultValue={{ text: 'Semua', value: '*' }}
                options={['*', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(each => ({
                  text: each === '*' ? 'Semua' : String(each),
                  value: String(each),
                }))}
              />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="my-[24px] overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="overflow-hidden sm:rounded-lg">
                <table className="w-full table-fixed rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Surat Dinas
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Isi Penugasan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Unit Kerja
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-100">
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">1</td>
                      <td
                        className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900 underline underline-offset-1"
                        onClick={() => (window.location.href = '/kepegawaian/rekap-dinas?id=1')}
                      >
                        4070/E1/TI.02.00/2021
                      </td>
                      <td className="px-6 text-xs font-medium text-gray-900">Rapat Sosialisasi PKKM</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        Sekretariat Direktorat Jenderal Pendidikan Tinggi
                      </td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">2</td>
                      <td
                        className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-900 underline underline-offset-1"
                        onClick={() => (window.location.href = '/kepegawaian/rekap-dinas?id=1')}
                      >
                        4070/E1/TI.02.00/2021
                      </td>
                      <td className="px-6 text-xs font-medium text-gray-900">Rapat Sosialisasi PKKM</td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        Sekretariat Direktorat Jenderal Pendidikan Tinggi
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withErrorBoundary(RekapDinasPage);
