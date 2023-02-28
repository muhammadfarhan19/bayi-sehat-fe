import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { CutiAPI, UnitKerjaAPI } from '../../../constants/APIUrls';
import { GetCutiListParams, GetCutiListRes } from '../../../types/api/CutiAPI';
import { GetKehadiranList } from '../../../types/api/KlaimKehadiranAPI';
import { GetUnitKerjaData } from '../../../types/api/UnitKerjaAPI';
import { formatDate } from '../../../utils/DateUtil';
import FileLoader from '../../shared/FileLoader';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import AutoComplete from '../../shared/Input/ComboBox';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import { PengajuanType, StatusPengajuan, StatusText } from '../Shared/_resource';
import KlaimModal from './KlaimModal';

type ListKlaimProps = {
  onShowDetail: (id: number) => void;
};

function KlaimList(props: ListKlaimProps) {
  const { onShowDetail } = props;
  const personalData = usePersonalData();
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const [filterState, setFilterState] = React.useState<GetKehadiranList>({
    page: 1,
    per_page: 20,
    unit_kerja_id: personalData?.unit_kerja_id,
  });

  const {
    data: getKlaimKehadiran,
    isValidating,
    mutate,
  } = useCommonApi<GetCutiListParams, GetCutiListRes>(CutiAPI.GET_CUTI_LIST, filterState, { method: 'GET' });

  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  const search = async <T extends keyof typeof filterState>(type: T, value: typeof filterState[T]) => {
    const newState = { ...filterState };
    newState[type] = value;
    setFilterState(newState);
  };

  const [formModalState, setFormModalState] = React.useState<{
    open: boolean;
    selectedId?: number;
  }>({
    open: false,
    selectedId: undefined,
  });

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const changeFilterState = (inputState: Partial<GetKehadiranList>) => {
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
    <div className="overflow-auto rounded-lg bg-white px-6 py-6 shadow">
      <div className="mb-5 flex flex-row items-center">
        <h3 className="text-xl font-medium leading-6 text-gray-900">Data Klaim Cuti</h3>
        <div className="ml-auto flex">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Cari..."
            onChange={e => search('nama', e.target.value)}
          />
          <button
            className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
            onClick={() => null}
          >
            <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex w-full flex-row gap-x-[16px]">
        <div className="w-[202px]">
          <p className="pb-1 pl-1 text-sm font-medium text-gray-700">Unit Kerja</p>
          <select
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm"
            onChange={e => {
              changeFilterState({ unit_kerja_id: e.target.value === '' ? undefined : Number(e.target.value) });
            }}
            disabled={!!personalData?.unit_kerja_id}
          >
            <option value="">Semua</option>
            {(unitKerjaList || []).map((item, index) => (
              <option
                selected={personalData?.unit_kerja_id === Number(item?.unit_kerja_id) ? true : false}
                key={`options-${index}`}
                value={item?.unit_kerja_id}
              >
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[202px] pb-2">
          <p className="text-sm font-medium text-gray-700">Dari Tanggal</p>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={e => changeFilterState({ tgl_mulai: e.target.value })}
          />
        </div>
        <div className="w-[202px] pb-2">
          <p className="text-sm font-medium text-gray-700">Sampai Tanggal</p>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={e => changeFilterState({ tgl_selesai: e.target.value })}
          />
        </div>

        <div className="w-[202px] pb-2">
          <AutoComplete
            label={'Status Pengajuan'}
            onChange={e => changeFilterState({ status: Number(e.value) })}
            defaultValue={{ text: 'Semua', value: '*' }}
            options={[0, 1, 2, -1].map(each => ({
              text: each === 0 ? 'Semua' : each === 1 ? 'Diproses' : each === 2 ? 'Diterima' : 'Ditolak',
              value: String(each),
            }))}
          />
        </div>
      </div>
      {isValidating ? (
        <div className="relative h-[150px] w-full divide-y divide-gray-200">
          <Loader />
        </div>
      ) : (
        <div className="my-[24px] overflow-x-auto sm:mx-0 ">
          <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
            <div className="sm:rounded-lg">
              <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
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
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Tanggal Mulai
                    </th>
                    <th
                      scope="col"
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Tanggal Selesai
                    </th>
                    <th
                      scope="col"
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Jenis Pengajuan
                    </th>
                    <th
                      scope="col"
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Alasan
                    </th>
                    <th
                      scope="col"
                      className="w-5 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Dokumen
                    </th>
                    <th
                      scope="col"
                      className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="w-full px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(getKlaimKehadiran?.list || []).map((data, dataIdx) => {
                    const formattedDate: string = data?.tanggal
                      ? formatDate(new Date(data?.tanggal), 'dd MMM yyyy')
                      : '';
                    const formattedDateSelesai: string = data?.tanggal_selesai
                      ? formatDate(new Date(data?.tanggal_selesai), 'dd MMM yyyy')
                      : '';
                    const statType = PengajuanType.find(item => item?.value === data?.type);
                    const isDitolakNorIsDiterima =
                      data?.status === StatusPengajuan.Ditolak || data?.status === StatusPengajuan.Diterima;
                    const currentStatus =
                      data?.status === StatusPengajuan.Diterima
                        ? StatusText.Diterima
                        : data?.status === StatusPengajuan.Ditolak
                        ? StatusText.Ditolak
                        : StatusText.Diajukan;
                    return (
                      <tr
                        key={data?.id}
                        className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">
                          {filterState.per_page * (filterState.page - 1) + (dataIdx + 1)}
                        </td>
                        <td
                          onClick={() => onShowDetail(data?.id)}
                          className="cursor-pointer px-6 py-4 text-xs font-medium text-blue-500"
                        >
                          {data?.nama_pegawai}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{formattedDate}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{formattedDateSelesai}</td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">{statType?.text}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.note}</td>
                        <td className="px-6 py-4 text-xs font-medium text-blue-900">
                          <FileLoader uuid={data?.files?.[0]?.document_uuid} asLink>
                            {data?.files?.[0]?.document_name?.length === 0 ? '-' : data?.files?.[0]?.document_name}
                          </FileLoader>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{currentStatus}</td>
                        <td className="py-4 pr-2">
                          <button
                            onClick={() => {
                              handleShowForm(!formModalState?.open, data?.id);
                            }}
                            disabled={isDitolakNorIsDiterima}
                            type="button"
                            className={`inline-flex w-36 items-center justify-center rounded border border-transparent ${
                              isDitolakNorIsDiterima
                                ? 'bg-gray-300 hover:bg-gray-700 disabled:bg-gray-500'
                                : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200'
                            } px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:text-gray-200`}
                          >
                            Proses Klaim
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {formModalState?.open && (
                <KlaimModal
                  open={formModalState?.open}
                  setOpen={(open: boolean) => handleShowForm(open, 0)}
                  selectedId={formModalState?.selectedId}
                  onSuccess={() => mutate()}
                />
              )}
              <Pagination
                onChange={value => {
                  changeFilterState({ page: value });
                }}
                totalData={getKlaimKehadiran ? getKlaimKehadiran?.pagination.total_data : 0}
                perPage={filterState?.per_page}
                page={filterState?.page}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KlaimList;
