import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import format from 'date-fns/format';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { PresensiAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  PostPresensiShiftDateInsertReq,
  PostPresensiShiftDateInsertRes,
  PostPresensiShiftDateUpdateReq,
  PostPresensiShiftDateUpdateRes,
  PresensiShiftDateData,
} from '../../../types/api/PresensiAPI';
import { Status } from '../../../types/Common';
import { classNames } from '../../../utils/Components';
import { callAPI } from '../../../utils/Fetchers';
import AutoComplete from '../../shared/Input/ComboBox';
import DatePickerCustom from '../../shared/Input/DatePicker';

const date = new Date();

export const TypeShiftList = [
  { value: '1', text: 'Libur' },
  { value: '2', text: 'Ramadhan' },
];

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: PresensiShiftDateData;
  onSuccess: () => void;
}

interface FormState {
  id?: number;
  tanggal: string;
  shift_id: number;
  remark: string;
}

export default function LiburDanRamadhanForm(props: UploadFormProps) {
  const { open, setOpen, data, onSuccess } = props;
  const dispatch = useDispatch();
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      shift_id: Number(TypeShiftList[0].value),
      tanggal: format(date, 'yyyy-MM-dd'),
    },
  });

  React.useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('shift_id', data.shift_id);
      setValue('remark', data.remark);
      setValue('tanggal', format(new Date(data.tanggal), 'yyyy-MM-dd'));
    }
  }, [data]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (formData?.id) {
      resSubmit = await callAPI<PostPresensiShiftDateUpdateReq, PostPresensiShiftDateUpdateRes>(
        PresensiAPI.PRESENSI_SHIFT_DATE_UPDATE,
        {
          id: formData.id,
          shift_id: formData.shift_id,
          remark: formData.remark,
          tanggal: formData.tanggal,
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostPresensiShiftDateInsertReq, PostPresensiShiftDateInsertRes>(
        PresensiAPI.PRESENSI_SHIFT_DATE_INSERT,
        {
          remark: formData.remark,
          shift_id: formData.shift_id,
          tanggal: formData.tanggal,
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {data?.id ? 'Perbaharui' : 'Tambah'} Hari Libur dan Ramadhan
                </h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name="shift_id"
                    rules={{ required: 'Mohon isi tipe shift' }}
                    render={({ field: { onChange } }) => (
                      <AutoComplete
                        onChange={value => onChange(Number(value.value))}
                        label={'Tipe Shift'}
                        defaultValue={TypeShiftList[0]}
                        options={TypeShiftList}
                      />
                    )}
                  />
                  {errors.shift_id && <p className="mt-1 text-xs text-red-500">{errors.shift_id.message}</p>}
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                    Tanggal
                  </label>
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name={'tanggal'}
                      rules={{ required: 'Mohon masukkan tanggal.' }}
                      render={({ field: { onChange, value } }) => (
                        <DatePickerCustom
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          selected={new Date(value)}
                          dateFormat="dd/MM/yyyy"
                          onChange={(date: Date) => onChange(format(date, 'yyyy-MM-dd'))}
                          customInput={
                            <input
                              type="text"
                              className={classNames(
                                'block w-full rounded-md shadow-sm sm:text-sm',
                                errors.tanggal
                                  ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                              )}
                            />
                          }
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                  <div className="mt-1">
                    <input
                      {...register('remark', { required: 'Silahkan masukan keterangan.' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      type="text"
                    />
                    {errors.remark && <p className="mt-1 text-xs text-red-500">{errors.remark.message}</p>}
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {data?.id ? 'Ubah' : 'Simpan'}
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
