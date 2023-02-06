import { AdjustmentsIcon } from '@heroicons/react/outline';
import React from 'react';

import { KlaimKehadiranList } from '../../../constants/APIUrls';
import { GetKehadiranDataList, GetKehadiranList } from '../../../types/api/KlaimKehadiranAPI';
import FileLoader from '../../shared/FileLoader';
import useCommonApi from '../../shared/hooks/useCommonApi';
import AutoComplete from '../../shared/Input/ComboBox';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import { ModalProps } from '../shared/type';
import KlaimModal from './KlaimModal';

type ListKlaimProps = {
  onShowDetail: (id: number) => void;
};

function KlaimAdmin(props: ListKlaimProps) {
  const { onShowDetail } = props;
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [filterState, setFilterState] = React.useState<GetKehadiranList>({
    page: 1,
    per_page: 20,
  });

  const {
    data: getKlaimKehadiran,
    isValidating,
    mutate,
  } = useCommonApi<GetKehadiranList, GetKehadiranDataList>(
    KlaimKehadiranList.GET_KLAIM_KEHADIRAN_LIST,
    filterState,
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  const search = async <T extends keyof typeof filterState>(type: T, value: typeof filterState[T]) => {
    const newState = { ...filterState };
    newState[type] = value;
    setFilterState(newState);
  };

  const [formModalState, setFormModalState] = React.useState<ModalProps>({
    open: false,
    selectedId: undefined,
    tanggal_klaim: '',
    jenis_pengajuan: '',
    user_id: undefined,
    nama: undefined,
    unitKerja: undefined,
    alasan: undefined,
    uuid: undefined,
    docName: undefined,
  });

  const handleShowForm = (
    open: boolean,
    tanggal_klaim: string,
    jenis_pengajuan: string,
    user_id?: number,
    selectedId?: number,
    nama?: string,
    unitKerja?: string,
    alasan?: string,
    uuid?: string,
    docName?: string
  ) => {
    setFormModalState({
      open,
      selectedId,
      tanggal_klaim,
      jenis_pengajuan,
      user_id,
      nama,
      unitKerja,
      alasan,
      uuid,
      docName,
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
        <h3 className="text-xl font-medium leading-6 text-gray-900">Data Klaim Kehadiran</h3>
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
            options={[0, 1, 2, 3].map(each => ({
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
                      Tanggal
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
                      className="py-3 pl-5 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(getKlaimKehadiran?.list || []).map((data, dataIdx) => {
                    const isStatusProcessed = data?.status_klaim === 2 || data?.status_klaim === 3;
                    const disabledButton = isStatusProcessed
                      ? 'bg-gray-300 hover:bg-gray-700 disabled:bg-gray-500'
                      : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-200';
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
                          {data?.nama}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.tanggal_klaim}</td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900">
                          {data?.jenis_pengajuan}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.alasan_klaim}</td>
                        <td className="px-6 py-4 text-xs font-medium text-blue-900">
                          <FileLoader uuid={data?.files?.[0]?.document_uuid} asLink>
                            {data?.files?.[0]?.document_name?.length === 0 ? '-' : data?.files?.[0]?.document_name}
                          </FileLoader>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.status_klaim_str}</td>
                        <td className="py-4 pl-5">
                          <button
                            onClick={() => {
                              handleShowForm(
                                !formModalState?.open,
                                data?.tanggal_klaim,
                                data?.jenis_pengajuan,
                                data?.user_id,
                                data?.id,
                                data?.nama,
                                data?.unit_kerja_str,
                                data?.alasan_klaim,
                                data?.files?.[0]?.document_uuid,
                                data?.files?.[0]?.document_name
                              );
                            }}
                            disabled={isStatusProcessed}
                            type="button"
                            className={`inline-flex w-36 items-center justify-center rounded border border-transparent ${disabledButton} px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:text-gray-200`}
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
                  setOpen={(open: boolean) => handleShowForm(open, '', '')}
                  selectedId={formModalState?.selectedId}
                  tanggalKlaimSelected={formModalState?.tanggal_klaim}
                  pegawaiIdSelected={formModalState?.user_id}
                  jenisPengajuanSelected={formModalState?.jenis_pengajuan}
                  onSuccess={() => mutate()}
                  namaPegawai={formModalState?.nama}
                  unitKerja={formModalState?.unitKerja}
                  alasan={formModalState?.alasan}
                  uploadedDocument={formModalState?.uuid}
                  uploadedDocumentName={formModalState?.docName}
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

export default KlaimAdmin;
