import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { PresensiAPI, PresensiShiftPegawaiAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { PresensiShiftData } from '../../../../types/api/PresensiAPI';
import {
  PresensiShiftPegawaiData,
  PresensiShiftPegawaiInsertReq,
  PresensiShiftPegawaiInsertRes,
  PresensiShiftPegawaiUpdateReq,
  PresensiShiftPegawaiUpdateRes,
} from '../../../../types/api/PresensiShiftPegawaiAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../shared/Input/ComboBox';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: PresensiShiftPegawaiData;
  onSuccess: () => void;
}

interface FormState {
  id?: number;
  pegawai_id: number;
  tanggal: string;
  shift_id: number;
  remark: string;
}

export default function ShiftPnsForm(props: UploadFormProps) {
  const { open, setOpen, onSuccess, data } = props;
  const dispatch = useDispatch();
  const personalData = usePersonalData();
  const [load, setLoad] = React.useState(true);
  const [defaultValue, setDefaultValue] = React.useState({
    text: '',
    value: '',
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormState>();

  const { data: dataPresensi, isValidating } = useCommonApi<null, PresensiShiftData[]>(
    PresensiAPI.PRESENSI_SHIFT_LIST,
    null,
    { method: 'get' }
  );

  React.useEffect(() => {
    if (data) {
      if (!isValidating) {
        const defaultType = dataPresensi?.find(each => each.id === data?.shift_id);
        setDefaultValue({
          text: String(defaultType?.nama_shift),
          value: String(defaultType?.id),
        });
        setValue('shift_id', Number(defaultType?.id));
        setValue('tanggal', data?.tanggal);
        setLoad(false);
      }
    } else {
      setLoad(false);
    }
  }, [dataPresensi]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (data) {
      resSubmit = await callAPI<PresensiShiftPegawaiUpdateReq, PresensiShiftPegawaiUpdateRes>(
        PresensiShiftPegawaiAPI.PRESENSI_SHIFT_PEGAWAI_UPDATE,
        {
          id: Number(data?.id),
          pegawai_id: Number(personalData?.pegawai_id),
          tanggal: String(formData.tanggal),
          shift_id: Number(formData.shift_id),
          remark: String(data?.remark),
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PresensiShiftPegawaiInsertReq, PresensiShiftPegawaiInsertRes>(
        PresensiShiftPegawaiAPI.PRESENSI_SHIFT_PEGAWAI_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          tanggal: String(formData.tanggal),
          shift_id: Number(formData.shift_id),
          remark: String(''),
        },
        { method: 'post' }
      );
    }

    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      onSuccess();
      setOpen(!open);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
    }
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  if (load) {
    return <></>;
  }

  console.log(watch());

  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Perbaharui Shift</h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                    NIP
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      disabled={true}
                      name="nip"
                      type="text"
                      value={personalData?.nip}
                    />
                  </div>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                    Nama
                  </label>
                  <div className="mt-1">
                    <input
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      disabled={true}
                      name="nama"
                      type="text"
                      value={personalData?.nama}
                    />
                  </div>
                </div>
                <div className="pt-5 sm:col-span-2 sm:mt-0">
                  <Controller
                    control={control}
                    name="shift_id"
                    rules={{ required: 'Mohon isi Shift' }}
                    render={({ field: { onChange } }) => (
                      <AutoComplete
                        onChange={input => {
                          onChange(input?.value);
                        }}
                        label={'Shift'}
                        defaultValue={{ text: defaultValue.text || '', value: defaultValue.value || '' }}
                        options={(dataPresensi || []).map(each => ({
                          text: String(each?.nama_shift),
                          value: String(each?.id),
                        }))}
                      />
                    )}
                  />
                  {errors.shift_id && <p className="mt-1 text-xs text-red-500">{errors.shift_id.message}</p>}
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                    Tanggal
                  </label>
                  <div className="mt-1">
                    <input
                      {...register('tanggal', { required: 'Mohon isi tanggal' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                      name="tanggal"
                      type="date"
                    />
                    {errors.tanggal && <p className="mt-1 text-xs text-red-500">{errors.tanggal.message}</p>}
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Perbaharui
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
