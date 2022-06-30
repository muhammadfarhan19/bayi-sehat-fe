import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { UserAPI } from '../../../../constants/APIUrls';
import { GenderText, StatusMenikahText } from '../../../../constants/Resource';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import {
  GetUserProfileData,
  GetUserProfileReq,
  PostUserProfileReq,
  PostUserProfileRes,
} from '../../../../types/api/UserAPI';
import { Status, StatusMenikah } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import { getQueryString } from '../../../../utils/URLUtils';
import { CircleProgress } from '../../../shared/CircleProgress';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import Loader from '../../../shared/Loader/Loader';

export default function UpdateDataDiriPribadi() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { pegawai_id } = getQueryString<{ pegawai_id: string }>();

  const { data, isValidating } = useCommonApi<GetUserProfileReq, GetUserProfileData>(
    UserAPI.GET_USER_PROFILE,
    { pegawai_id: Number(pegawai_id) },
    { method: 'GET' }
  );

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<PostUserProfileReq>();

  React.useEffect(() => {
    if (!isValidating && data) {
      setValue('status_menikah', data?.status_menikah);
      setValue('jumlah_anak', data?.jumlah_anak);
      setValue('nik', data?.ktp);
      setValue('email', data?.email);
      setValue('alamat', data?.alamat);
      setValue('npwp', data?.npwp);
      setValue('bpjs', data?.bpjs);
    }
  }, [data]);

  if (isValidating) {
    return <Loader />;
  }

  const handleBack = () => {
    window.location.href = `/?pegawai_id=${pegawai_id}&tabName=Data%20Diri%20Pribadi`;
  };

  const submitHandler = async (formData: PostUserProfileReq) => {
    setLoading(true);

    const updateRes = await callAPI<PostUserProfileReq, PostUserProfileRes>(UserAPI.POST_USER_UPDATE_PROFILE, {
      ...formData,
      pegawai_id: Number(pegawai_id),
      jumlah_anak: Number(formData.jumlah_anak),
      status_menikah: Number(formData.status_menikah),
    });

    if (updateRes.status === 200 && updateRes.data?.status === Status.OK) {
      dispatch(setSnackbar({ show: true, type: SnackbarType.INFO, message: 'Berhasil mengubah data diri anda.' }));
      setTimeout(() => {
        handleBack();
      }, 500);
    } else {
      setLoading(false);
      dispatch(
        setSnackbar({
          show: true,
          type: SnackbarType.ERROR,
          message: 'Terjadi kesalahan saat mengubah data diri anda. Mohon dicoba lagi setelah beberapa saat.',
        })
      );
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg bg-white pb-6 shadow">
        <div className="my-3 inline-flex cursor-pointer items-center px-7 pl-4 pr-6 font-semibold" onClick={handleBack}>
          <ChevronLeftIcon className="mr-0.5 h-8" />
          <span className="tracking-wide text-gray-600">Kembali</span>
        </div>
        <div className="mt-5 mb-6 px-7 py-1">
          <h3 className="text-xl font-semibold tracking-wider text-gray-700">Data Dinas Pegawai</h3>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">Jenis Kelamin</div>
            <input
              value={data?.jenis_kelamin ? GenderText[data.jenis_kelamin] : ''}
              type="text"
              disabled
              className="shadow-s block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 disabled:bg-gray-200 sm:text-sm"
            />
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">Status Menikah</div>
            <Controller
              control={control}
              name="status_menikah"
              render={({ field: { onChange } }) => (
                <select
                  defaultValue={data?.status_menikah}
                  onChange={event => onChange(event.target.value)}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {Object.keys(StatusMenikahText)?.map((each, index) => {
                    return (
                      <option key={`options-${index}`} value={each}>
                        {StatusMenikahText[each as unknown as StatusMenikah]}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">Jumlah Anak</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('jumlah_anak', { required: true })}
                defaultValue={data?.jumlah_anak}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.jumlah_anak && errors.jumlah_anak.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data jumlah anak</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">NIK</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('nik', { required: true })}
                defaultValue={data?.ktp}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.nik && errors.nik.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data KTP</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">Email</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('email', { required: true })}
                defaultValue={data?.email}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.email && errors.email.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data email</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">Alamat</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('alamat', { required: true })}
                defaultValue={data?.alamat}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.alamat && errors.alamat.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data alamat</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">NPWP</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('npwp', { required: true })}
                defaultValue={data?.npwp}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.npwp && errors.npwp.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data NPWP</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center px-7">
            <div className="basis-[200px] text-sm font-medium tracking-wider text-[#6B7280]">BPJS</div>
            <div className="flex w-full flex-auto flex-col">
              <input
                {...register('bpjs', { required: true })}
                defaultValue={data?.bpjs}
                type="text"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
              {errors.bpjs && errors.bpjs.type === 'required' && (
                <div className="flex items-center">
                  <ExclamationCircleIcon className="mr-1 h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Mohon isikan data BPJS</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-auto flex-col items-end px-7">
            <div className="flex">
              <a
                href="/"
                className="mr-3 inline-flex items-center rounded border border-transparent bg-gray-400 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-500 disabled:bg-gray-200 disabled:text-gray-200"
              >
                Batal
              </a>
              <button
                disabled={loading}
                type="submit"
                className="flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
              >
                {loading ? <CircleProgress /> : null}
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
