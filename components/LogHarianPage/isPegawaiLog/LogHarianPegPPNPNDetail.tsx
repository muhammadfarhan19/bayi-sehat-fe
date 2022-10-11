import { ChevronLeftIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import id from 'date-fns/locale/id';
import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { LogHarianAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  // GetLogHarianReqMonth,
  // GetLogHarianWeekData,
  PostLogHarianDel,
  PostLogHarianRes,
} from '../../../types/api/LogHarianAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import ConfirmDialog from '../../shared/ConfirmDialog';
import useCommonApi from '../../shared/hooks/useCommonApi';
import usePersonalData from '../../shared/hooks/usePersonalData';
import Loader from '../../shared/Loader/Loader';
import FormLogHarianPPNPN from './FormLogHarianPPNPN';
// import { getDaysInMonth } from './Shared/_calendar';

interface DetailLogHarianProps {
  onBack?: () => void;
  selectedMonth?: number;
  selectedYear?: number;
}

function LogHarianPegPPNPNDetail(props: DetailLogHarianProps) {
  const { onBack, selectedMonth, selectedYear } = props;

  const personalPegawaiData = usePersonalData();
  const [confirmId, setConfirmId] = React.useState(0);
  const [dateSubmitted, setDateSubmitted] = React.useState(new Date());
  const [week, setWeek] = React.useState<string>('1');

  const dispatch = useDispatch();

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  // const { data: logHarianData, mutate } = useCommonApi<GetLogHarianReqMonth, GetLogHarianWeekData[]>(
  //   LogHarianAPI.GET_LOG_HARIAN_WEEK,
  //   { pegawai_id: Number(personalPegawaiData?.pegawai_id), year: Number(selectedYear), month: Number(selectedMonth) },
  //   { method: 'GET' },
  //   { revalidateOnMount: true }
  // );

  const { data: loglog, mutate } = useCommonApi<any, any>(
    LogHarianAPI.GET_LOG_HARIAN_LIS_WEEK_V2,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id), year: Number(selectedYear), month: Number(selectedMonth) },
    { method: 'GET' }
  );

  console.log(loglog);

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostLogHarianDel, PostLogHarianRes>(
      LogHarianAPI.POST_LOG_HARIAN_DELETE,
      { log_id: confirmId },
      { method: 'POST' }
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

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  if (!personalPegawaiData) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white px-6 py-6">
      <div className="my-3 inline-flex cursor-pointer items-center bg-white" onClick={onBack}>
        <ChevronLeftIcon className="mr-1 h-5" />
        <span className="bg-white tracking-wide text-gray-600">Kembali</span>
      </div>
      <div className="bg-white">
        <div className="mt-5 mb-2">
          <span className="text-xl font-[600]">Log Harian</span>
        </div>
        <div className="flex w-full flex-row justify-between">
          <div className="w-[202px] pb-2">
            <select
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={e => setWeek(e.target.value)}
            >
              <option value={'1'}>Minggu - 1</option>
              <option value={'2'}>Minggu - 2</option>
              <option value={'3'}>Minggu - 3</option>
              <option value={'4'}>Minggu - 4</option>
              <option value={'5'}>Minggu - 5</option>
            </select>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead></thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {Object?.entries(loglog?.[`minggu ${week}`] || []).map((data: any, dataIdx) => (
              <tr key={dataIdx}>
                <td className={`mt-5 inline-flex w-52 px-4 text-[15px] font-bold font-medium text-[#000000]`}>
                  {format(new Date(data?.[0]), 'EEEE, dd MMMM', { locale: id })}
                </td>
                {data?.[1]?.length === 0 ? (
                  <td className={`flex ${'justify-center'} px-6 py-4 text-sm font-extrabold text-[#6B7280]`}>-</td>
                ) : (
                  (data?.[1] || [])?.map((item: { summary: any; log_id: any; log_date: any }) => (
                    <div className="flex flex-row justify-between">
                      <td
                        className={`ml-20 list-item ${
                          personalPegawaiData?.status_cpns === 2 ? 'justify-end' : 'justify-center'
                        } px-6 py-4 text-sm font-extrabold text-[#6B7280]`}
                      >
                        {item?.summary}
                      </td>
                      {personalPegawaiData?.status_cpns === 2 ? (
                        <td className="flex flex-1 justify-end px-6 py-4 text-sm font-medium text-[#6B7280]">
                          <button
                            onClick={() => setConfirmId(item?.log_id)}
                            className="w-40 items-center justify-center rounded border bg-red-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                          >
                            Hapus
                          </button>
                        </td>
                      ) : null}
                    </div>
                  ))
                )}
                {personalPegawaiData?.status_cpns === 2 ? (
                  <td className="flex flex-1 justify-end px-6 py-4 text-sm font-medium text-[#6B7280]">
                    <button
                      onClick={() => {
                        handleShowForm(!formModalState.open);
                        setDateSubmitted(new Date(data?.[0]));
                      }}
                      className="inline-flex w-40 items-center justify-center rounded border bg-indigo-600 px-2.5 py-2 text-center text-xs font-medium text-white shadow-sm hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-200"
                    >
                      Tambah Log
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {formModalState?.open && (
        <FormLogHarianPPNPN
          onSuccess={() => mutate()}
          selectedId={dateSubmitted}
          open={formModalState?.open}
          setOpen={(open: boolean) => handleShowForm(open)}
        />
      )}
      <ConfirmDialog
        open={!!confirmId}
        message="Anda yakin ingin menghapus data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default LogHarianPegPPNPNDetail;
