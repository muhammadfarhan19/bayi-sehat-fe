import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { KepegawaianAPI } from '../../../../constants/APIUrls';
import { StatusPegawai } from '../../../../constants/Resource';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { PostStatusKepegawaianReq, PostStatusKepegawaianRes } from '../../../../types/api/KepegawaianAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import { withErrorBoundary } from '../../../shared/hocs/ErrorBoundary';
import useAllowAdmin from '../../../shared/hooks/useAllowAdmin';
import usePersonalData from '../../../shared/hooks/usePersonalData';

interface FormState {
  status_kepegawaian: number;
}

function StatusKepegawaian() {
  const dataPersonal = usePersonalData();
  const isAllowAdmin = useAllowAdmin();
  const dispatch = useDispatch();

  const { handleSubmit, register } = useForm<FormState>();
  const [load, setLoad] = React.useState(false);

  const submitHandler = async (formData: FormState) => {
    setLoad(true);
    const resSubmit = await callAPI<PostStatusKepegawaianReq, PostStatusKepegawaianRes>(
      KepegawaianAPI.POST_STATUS_KEPEGAWAIAN,
      {
        pegawai_id: Number(dataPersonal?.pegawai_id),
        status_kepegawaian: Number(formData?.status_kepegawaian),
      },
      { method: 'post' }
    );

    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
    setLoad(false);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="grid grid-cols-2 lg:grid-cols-3">
        <p className="py-4 pl-6 text-sm font-medium text-[#6B7280]">Status</p>
        <p className="ml-[10%] py-4 text-sm text-gray-500">
          {typeof dataPersonal?.status_kepegawaian !== 'undefined' &&
            StatusPegawai.filter(each => each.value === dataPersonal?.status_kepegawaian)[0]?.text}
        </p>
        {isAllowAdmin && (
          <select
            {...register('status_kepegawaian')}
            className="my-auto block h-fit w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {StatusPegawai.map(item => {
              return (
                <option key={item.value} value={item.value} selected={dataPersonal?.status_kepegawaian === item.value}>
                  {item.text}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div className="mt-[20px] h-[1px] w-full bg-gray-200"></div>
      {isAllowAdmin && (
        <div className="mt-[29px] flex">
          <button
            disabled={load}
            className="ml-auto rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-gray-50 disabled:bg-gray-400"
          >
            {load ? 'Processing' : 'Submit'}
          </button>
        </div>
      )}
    </form>
  );
}

export default withErrorBoundary(StatusKepegawaian);
