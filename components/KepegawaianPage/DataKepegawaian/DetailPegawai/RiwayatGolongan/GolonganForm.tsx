import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { GolonganAPI, MasterAPI } from '../../../../../constants/APIUrls';
import { Golongan } from '../../../../../constants/Resource';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import {
  PostRiwayatGolonganInsertReq,
  PostRiwayatGolonganInsertRes,
  RiwayatGolonganListData,
  UpdateRiwayatGolonganReq,
  UpdateRiwayatGolonganRes,
} from '../../../../../types/api/GolonganAPI';
import { MasterJenisKpData } from '../../../../../types/api/MasterAPI';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete, { OptionType } from '../../../../shared/Input/ComboBox';
import DatePicker from '../../../../shared/Input/DatePicker';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';
import Loader from '../../../../shared/Loader/Loader';

interface FormState {
  tmt: number;
  tipe_kp: number | string | any;
  tahun: string;
  bulan: string;
  golongan: string;
  file_name: string;
  file_id: string;
}

interface GolonganFormProps {
  onSuccess: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  detail?: RiwayatGolonganListData;
}

const yearMonthOption = () => {
  const years: OptionType[] = [];
  const months: OptionType[] = [];
  for (let index = 0; index <= 70; index++) {
    years.push({ text: index + ' Tahun', value: String(index) });
    if (index < 12) {
      months.push({ text: index + ' Bulan', value: String(index) });
    }
  }
  return [years, months];
};

export default function GolonganForm(props: GolonganFormProps) {
  const pegawai = usePersonalData();
  const dispatch = useDispatch();
  const { onSuccess, open, setOpen, detail } = props;
  const [yearOptions, monthOptions] = yearMonthOption();
  const [jenisKpList, setJenisKpList] = React.useState<React.SetStateAction<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const isEditForm = !!detail?.riwayat_id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<FormState>({
    defaultValues: {
      tmt: Date.now(),
    },
  });

  React.useLayoutEffect(() => {
    dataGolongan();
  }, []);

  const toggleModal = () => {
    setOpen(!open);
  };

  const dataGolongan = async () => {
    setIsLoading(true);
    await callAPI<null, MasterJenisKpData[]>(MasterAPI.GET_MASTER_JENIS_KP, null, { method: 'GET' })
      .then(res => {
        res.data;
        setJenisKpList(res?.data);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    if (detail) {
      setIsLoading(true);
      const masaJabatan = detail?.masa_jabatan.split(' ');
      setValue('file_id', String(detail?.files?.[0]?.document_uuid || ''));
      setValue('file_name', String(detail?.files?.[0]?.document_uuid || ''));
      setValue('tahun', masaJabatan?.[0]);
      setValue('bulan', masaJabatan?.[2]);
      setValue('tmt', Number(new Date(detail?.tmt).getTime()));
      setValue('tipe_kp', detail?.tipe_kp);
      setIsLoading(false);
    } else {
      resetField('golongan');
      resetField('file_id');
      resetField('file_name');
      resetField('tahun');
      resetField('bulan');
      resetField('tmt');
    }
  }, [open]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (isEditForm) {
      resSubmit = await callAPI<UpdateRiwayatGolonganReq, UpdateRiwayatGolonganRes>(
        GolonganAPI.UPDATE_RIWAYAT_GOLONGAN,
        {
          riwayat_id: detail.riwayat_id,
          tanggal_mulai: new Date(formData.tmt).toISOString().split('T')?.[0],
          masa_jabatan: formData.tahun + ' tahun ' + formData.bulan + ' bulan',
          tipe_kp: Number(formData.tipe_kp),
          files: [
            {
              document_name: formData.file_name,
              document_uuid: formData.file_id,
            },
          ],
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatGolonganInsertReq, PostRiwayatGolonganInsertRes>(
        GolonganAPI.INSERT_RIWAYAT_GOLONGAN,
        {
          employee_id: Number(pegawai?.pegawai_id),
          golongan_id: Number(formData.golongan),
          tipe_kp: Number(formData.tipe_kp),
          tanggal_mulai: new Date(formData.tmt).toISOString().split('T')?.[0],
          masa_jabatan: formData.tahun + ' tahun ' + formData.bulan + ' bulan',
          files: [
            {
              document_name: formData.file_name,
              document_uuid: formData.file_id,
            },
          ],
        },
        { method: 'post' }
      );
    }

    if (resSubmit?.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      onSuccess();
      setOpen(!open);
      return;
    }

    dispatch(
      setSnackbar({
        show: true,
        message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
        type: SnackbarType.ERROR,
      })
    );
  };

  if (isLoading) {
    <div className="relative h-[150px] w-full divide-y divide-gray-200">
      <Loader />
    </div>;
  }

  return (
    <>
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
                    {isEditForm ? 'Ubah' : 'Tambah'} Riwayat Golongan
                  </h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <form onSubmit={handleSubmit(submitHandler)} className="mt-2">
                  {!isEditForm && (
                    <div className="mt-5 sm:col-span-6">
                      <Controller
                        control={control}
                        name="golongan"
                        rules={{ required: 'Mohon input data golongan.' }}
                        render={({ field: { onChange } }) => (
                          <AutoComplete
                            onChange={value => onChange(value.value)}
                            label={'Golongan'}
                            placeholder={'Pilih golongan'}
                            options={Golongan}
                          />
                        )}
                      />
                      {errors.golongan && <p className="mt-1 text-xs text-red-500">{errors.golongan.message}</p>}
                    </div>
                  )}
                  <div className="mt-5 sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Masa Jabatan</label>
                    <div className="flex flex-row items-center justify-between">
                      <Controller
                        control={control}
                        name="tahun"
                        rules={{ required: 'Mohon masukkan tahun.' }}
                        render={({ field: { onChange, value } }) => (
                          <AutoComplete
                            onChange={value => onChange(value.value)}
                            label={''}
                            defaultValue={
                              (value && yearOptions.filter(each => each.value === value)?.[0]) || {
                                text: '',
                                value: '',
                              }
                            }
                            placeholder={'0 Tahun'}
                            options={yearOptions}
                          />
                        )}
                      />
                      <Controller
                        control={control}
                        name="bulan"
                        rules={{ required: 'Mohon masukkan bulan.' }}
                        render={({ field: { onChange, value } }) => (
                          <AutoComplete
                            onChange={value => onChange(value.value)}
                            label={''}
                            defaultValue={
                              (value && monthOptions.filter(each => each.value === value)?.[0]) || {
                                text: '',
                                value: '',
                              }
                            }
                            placeholder={'0 Bulan'}
                            options={monthOptions}
                          />
                        )}
                      />
                    </div>
                    {(errors.tahun || errors.bulan) && (
                      <p className="mt-1 text-xs text-red-500">{'Masukkan info masa jabatan'}</p>
                    )}
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <Controller
                      control={control}
                      name="tipe_kp"
                      rules={{ required: 'Mohon input data golongan.' }}
                      render={({ field: { onChange } }) => (
                        <AutoComplete
                          onChange={value => onChange(value.value)}
                          label={'Jenis KP'}
                          placeholder={'Pilih jenis kp'}
                          defaultValue={{ text: detail?.tipe_kp_str || '', value: String(detail?.tipe_kp) || '' }}
                          options={(jenisKpList?.data || []).map((each: { jenis_kp: any; id: any }) => ({
                            text: each?.jenis_kp,
                            value: String(each?.id),
                          }))}
                        />
                      )}
                    />
                    {errors.golongan && <p className="mt-1 text-xs text-red-500">{errors.golongan.message}</p>}
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">TMT</label>
                    <div className="mt-1">
                      <Controller
                        control={control}
                        name={'tmt'}
                        rules={{ required: 'Mohon masukkan tmt.' }}
                        render={({ field: { onChange, value } }) => (
                          <DatePicker
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            selected={new Date(value)}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date: Date) => onChange(date.getTime())}
                            customInput={
                              <input
                                type="text"
                                className={classNames(
                                  'block w-full rounded-md shadow-sm sm:text-sm',
                                  errors.tmt
                                    ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                                )}
                              />
                            }
                          />
                        )}
                      />
                      {errors.tmt && <p className="mt-1 text-xs text-red-500">{errors.tmt.message}</p>}
                    </div>
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <Controller
                      control={control}
                      name={'file_name'}
                      rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                      render={({ field: { onChange, value } }) => (
                        <UploadWrapper
                          allowedTypes={['pdf']}
                          handleUploadChange={(files: FileObject[]) => {
                            setValue('file_id', files[0].id);
                            onChange(files[0].name);
                          }}
                        >
                          {({ loading }) => (
                            <div
                              className={classNames(
                                'flex items-center justify-between border-[1px] p-3',
                                errors.file_name ? 'border-red-500' : ''
                              )}
                            >
                              <div>
                                <div className="text-sm text-gray-600">{value || 'Surat Keputusan'}</div>
                                <div className="text-xs text-gray-400">(pdf)</div>
                              </div>
                              <button
                                disabled={loading}
                                type="button"
                                className="inline-flex items-center rounded border border-green-300 bg-white px-2.5 py-1.5 text-xs font-medium text-green-700 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:text-gray-300"
                              >
                                {loading ? <CircleProgress /> : null}
                                <UploadIcon className="mr-1 h-4" />
                                Upload
                              </button>
                            </div>
                          )}
                        </UploadWrapper>
                      )}
                    />
                    {errors.file_name && <p className="mt-1 text-xs text-red-500">{errors.file_name.message}</p>}
                  </div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
