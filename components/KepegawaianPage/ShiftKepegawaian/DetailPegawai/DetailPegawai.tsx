import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { PresensiAPI, PresensiShiftPegawaiAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { PresensiShiftData } from '../../../../types/api/PresensiAPI';
import {
  PresensiShiftPegawaiData,
  PresensiShiftPegawaiDeleteReq,
  PresensiShiftPegawaiDeleteRes,
  PresensiShiftPegawaiDetailReq,
} from '../../../../types/api/PresensiShiftPegawaiAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import ConfirmDialog from '../../../shared/ConfirmDialog';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import Loader from '../../../shared/Loader/Loader';
import ShiftPnsForm from '../ShiftPNS/ShiftPnsForm';

function DetailPegawai() {
  const dispatch = useDispatch();
  const [confirmId, setConfirmId] = React.useState(0);
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const personalPegawaiData = usePersonalData();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; data?: PresensiShiftPegawaiData }>({
    open: false,
    data: undefined,
  });

  const handleShowForm = (open: boolean, data?: PresensiShiftPegawaiData) => {
    setFormModalState({
      open,
      data,
    });
  };

  const {
    data: presensiShift,
    mutate,
    isValidating: presensiShiftLoading,
  } = useCommonApi<PresensiShiftPegawaiDetailReq, PresensiShiftPegawaiData[]>(
    PresensiShiftPegawaiAPI.PRESENSI_SHIFT_PEGAWAI_LIST,
    { pegawai_id: Number(pegawai_id) },
    { method: 'GET' }
  );

  // console.log(presensiShift)
  const { data: dataPresensi, isValidating: dataPresensiLoading } = useCommonApi<null, PresensiShiftData[]>(
    PresensiAPI.PRESENSI_SHIFT_LIST,
    null,
    { method: 'get' }
  );

  const handleConfirm = async () => {
    const resDelete = await callAPI<PresensiShiftPegawaiDeleteReq, PresensiShiftPegawaiDeleteRes>(
      PresensiShiftPegawaiAPI.PRESENSI_SHIFT_PEGAWAI_DELETE,
      { id: confirmId },
      { method: 'post' }
    );

    let snackbarProps;
    if (resDelete.status === 200 && resDelete.data?.status === Status.OK) {
      snackbarProps = {
        show: true,
        message: 'Data terhapus.',
        type: SnackbarType.INFO,
      };
    } else {
      snackbarProps = {
        show: true,
        message: 'Gagal menghapus data.',
        type: SnackbarType.ERROR,
      };
    }
    dispatch(setSnackbar(snackbarProps));
    setConfirmId(0);
    mutate();
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg font-medium text-gray-900">Daftar Shift Pegawai</p>
            <div className="ml-auto">
              <button
                className="ml-1 inline-flex items-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
                onClick={() => handleShowForm(!formModalState.open)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Tambah Shift
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-[8px]">
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Kerja</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <input
                  disabled
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="unit kerja"
                  type="text"
                  value={personalPegawaiData?.unit_kerja}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Pegawai</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <input
                  disabled
                  className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                  name="unit kerja"
                  type="text"
                  value={personalPegawaiData?.nama}
                />
              </div>
            </div>

            {/* <label className="block text-sm font-medium text-gray-700">Jadwal Shift</label>
            <div className="mt-[10px] flex flex-row gap-x-[8px]">
              <div className="flex flex-col gap-y-[8px]">
                <label className="block text-sm font-medium text-gray-700">Tanggal Awal</label>
                <input className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" type={'date'} />
              </div>
              <div className="flex flex-col gap-y-[8px]">
                <label className="block text-sm font-medium text-gray-700">Tanggal Akhir</label>
                <input className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" type={'date'} />
              </div>
            </div> */}
          </div>
        </div>

        {presensiShiftLoading || dataPresensiLoading ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <table className="mt-[12px] w-full table-auto rounded-lg bg-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  TANGGAL
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  SHIFT
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  JAM MASUK
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  JAM KELUAR
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {(presensiShift || []).map((each, dataIdx) => {
                return (
                  <tr
                    key={dataIdx}
                    className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                  >
                    <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">{each?.tanggal}</td>
                    <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">
                      {dataPresensi?.find(item => item.id === each?.shift_id)?.nama_shift || '-'}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">
                      {dataPresensi?.find(item => item.id === each?.shift_id)?.shift_start ?? '-'}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">
                      {dataPresensi?.find(item => item.id === each?.shift_id)?.shift_end ?? '-'}
                    </td>
                    <td className="px-6 py-4 text-center text-xs font-medium text-gray-900">
                      <button
                        type="button"
                        className="mr-[8px] rounded-md bg-[#DC2626] px-[11px] py-[7px] text-xs font-medium text-white hover:bg-red-700 focus:outline-none"
                        onClick={() => setConfirmId(each?.id)}
                      >
                        Hapus
                      </button>
                      <button
                        type="button"
                        className="rounded-md bg-[#4F46E5] px-[11px] py-[7px] text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none"
                        onClick={() => handleShowForm(!formModalState.open, each)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {formModalState.open ? (
        <ShiftPnsForm
          onSuccess={() => mutate()}
          open={formModalState.open}
          setOpen={(open: boolean) => handleShowForm(open)}
          data={formModalState?.data}
        />
      ) : null}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default withErrorBoundary(DetailPegawai);
