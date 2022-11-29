import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import add from 'date-fns/add';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { KepegawaianAPI, MasterAPI, RiwayatKGBAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../../../types/api/KepegawaianAPI';
import { GetMasterJenisGol } from '../../../../../types/api/MasterAPI';
import {
  GetKGBList,
  PostDetailRiwayatKGBReq,
  PostRiwayatKGBReq,
  PostRiwayatKGBRes,
  PostRiwayatKGBUpdateReq,
} from '../../../../../types/api/RiwayatKGBApi';
import { Status } from '../../../../../types/Common';
import { classNames } from '../../../../../utils/Components';
import { callAPI } from '../../../../../utils/Fetchers';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';
import Loader from '../../../../shared/Loader/Loader';
import { InputLabelled } from '../RiwayatKeluarga/Shared/KeluargaComponents';
import AutoCompleteCustom from './Shared/CustomComboBox';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedId?: number;
  onSuccess: () => void;
}

interface FormState {
  riwayat_id: number;
  golongan_id: number | string;
  tanggal_kgb: string;
  tmt_kgb: string;
  penandatangan: string;
  jabatan_id?: number | string;
  tmt_kgb_selanjutnya: string;
  file_id_berkas_kgb: string;
  file_name_berkas_kgb: string;
}

export default function RiwayatKGBForm(props: UploadFormProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
  const dispatch = useDispatch();
  const personalData = usePersonalData();
  const [queryPegawai, setQueryPegawai] = React.useState('');
  const debounce = React.useRef<number>(0);
  const [golongan, setGolongan] = React.useState<React.SetStateAction<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { data: pegawaiList } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    { page: 1, per_page: 20, status_cpns: [0], nama: queryPegawai },
    { method: 'GET' }
  );

  const { data } = useCommonApi<PostDetailRiwayatKGBReq, GetKGBList>(
    RiwayatKGBAPI.GET_RIWAYAT_KGB_DETAIL,
    { riwayat_id: Number(selectedId) },
    { method: 'GET' },
    { revalidateOnMount: true }
  );

  React.useLayoutEffect(() => {
    dataGolongan();
  }, []);

  const dataGolongan = async () => {
    setIsLoading(true);
    await callAPI<null, GetMasterJenisGol>(MasterAPI.GET_MASTER_JENIS_GOLONGAN, null, { method: 'GET' })
      .then(res => {
        res.data;
        setGolongan(res?.data);
      })
      .finally(() => setIsLoading(false));
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormState>();

  const watchTMTKGB = watch('tmt_kgb');
  React.useEffect(() => {
    const incrementDateOneYear = add(new Date(watchTMTKGB), { years: 1 });
    if (watchTMTKGB) {
      setValue('tmt_kgb_selanjutnya', format(new Date(incrementDateOneYear), 'yyyy-MM-dd'));
    }
  }, [watchTMTKGB]);

  React.useLayoutEffect(() => {
    if (selectedId && data) {
      setValue('jabatan_id', data?.jabatan_id);
      setValue('golongan_id', data?.golongan_id);
      setValue('tanggal_kgb', data?.tanggal_kgb);
      setValue('tmt_kgb', data?.tmt_kgb);
      setValue('file_name_berkas_kgb', data?.files[0].document_name);
      setValue('penandatangan', data?.penandatangan);
      setValue('tmt_kgb_selanjutnya', data?.tmt_kgb_selanjutnya);
    }
  }, [data && selectedId]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostRiwayatKGBUpdateReq, PostRiwayatKGBRes>(
        RiwayatKGBAPI.POST_RIWAYAT_KGB_UPDATE,
        {
          riwayat_id: Number(selectedId),
          golongan_id: Number(formData?.golongan_id),
          pegawai_id: Number(personalData?.pegawai_id),
          tanggal_kgb: formData?.tanggal_kgb,
          tmt_kgb: formData?.tmt_kgb,
          penandatangan: formData?.penandatangan,
          jabatan_id: 418,
          tmt_kgb_selanjutnya: formData?.tmt_kgb_selanjutnya,
          files: [
            {
              document_name: formData?.file_name_berkas_kgb,
              document_uuid: formData?.file_id_berkas_kgb,
            },
          ],
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostRiwayatKGBReq, PostRiwayatKGBRes>(
        RiwayatKGBAPI.POST_RIWAYAT_KGB_INSERT,
        {
          pegawai_id: Number(personalData?.pegawai_id),
          golongan_id: Number(formData?.golongan_id),
          tanggal_kgb: formData?.tanggal_kgb,
          tmt_kgb: formData?.tmt_kgb,
          penandatangan: formData?.penandatangan,
          jabatan_id: 418,
          tmt_kgb_selanjutnya: formData?.tmt_kgb_selanjutnya,
          files: [
            {
              document_name: formData?.file_name_berkas_kgb,
              document_uuid: formData?.file_id_berkas_kgb,
            },
          ],
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

  if (isLoading) {
    <div className="relative h-[150px] w-full divide-y divide-gray-200">
      <Loader />
    </div>;
  }

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
                  {selectedId ? 'Ubah' : 'Tambah'} Riwayat KGB
                </h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name="golongan_id"
                    rules={{ required: 'Mohon input data golongan.' }}
                    render={({ field: { onChange } }) => (
                      <AutoComplete
                        defaultValue={{ text: data?.golongan_id_str || '', value: String(data?.golongan_id) || '' }}
                        onChange={value => onChange(value.value)}
                        label={'Golongan'}
                        placeholder={'Pilih golongan'}
                        options={(golongan?.data || []).map(
                          (each: { golongan: any; pangkat: any; golongan_id: any }) => ({
                            text: `${each?.golongan}, ${each?.pangkat}`,
                            value: String(each?.golongan_id),
                          })
                        )}
                      />
                    )}
                  />
                  {errors.golongan_id && <p className="mt-1 text-xs text-red-500">{errors.golongan_id.message}</p>}
                </div>
                <InputLabelled
                  name="tanggal_kgb"
                  type="date"
                  label="Tanggal KGB"
                  errorMessage={errors.tanggal_kgb?.message}
                  isError={errors.tanggal_kgb}
                  validation={{ ...register('tanggal_kgb', { required: 'Silahkan Masukkan Tanggal KGB' }) }}
                />
                <InputLabelled
                  name="tmt_kgb"
                  type="date"
                  label="TMT KGB"
                  errorMessage={errors.tmt_kgb?.message}
                  isError={errors.tmt_kgb}
                  validation={{ ...register('tmt_kgb', { required: 'Silahkan Masukkan TMT KGB' }) }}
                />
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name="penandatangan"
                    rules={{ required: 'Mohon isi data Jabatan Penandatangan' }}
                    render={({ field: { onChange } }) => (
                      <AutoCompleteCustom
                        onChange={input => {
                          onChange(input?.value);
                        }}
                        label={'Pejabat Penandatangan'}
                        defaultValue={{ text: data?.penandatangan || '', value: String(data?.penandatangan) || '' }}
                        onQueryChange={queryText => {
                          if (debounce.current) {
                            clearTimeout(debounce.current);
                          }
                          debounce.current = window.setTimeout(() => {
                            setQueryPegawai(queryText);
                          }, 500);
                        }}
                        options={(pegawaiList?.list || []).map(each => ({
                          text: each.name,
                          value: String(each.name),
                        }))}
                      />
                    )}
                  />
                  {errors.penandatangan && <p className="mt-1 text-xs text-red-500">{errors.penandatangan.message}</p>}
                </div>
                {/* <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name="jabatan_id"
                    rules={{ required: 'Mohon isi data Jabatan Penandatangan' }}
                    render={({ field: { onChange } }) => (
                      <AutoComplete
                        onChange={value => onChange(value.value)}
                        label={'Jabatan Penandatangan'}
                        defaultValue={{ text: data?.jabatan_id_str || '', value: String(data?.jabatan_id) || '' }}
                        onQueryChange={queryText => {
                          if (debounce.current) {
                            clearTimeout(debounce.current);
                          }
                          debounce.current = window.setTimeout(() => {
                            setQueryJabatan(queryText);
                          }, 500);
                        }}
                        options={(daftarJabatan?.list || []).map(each => ({
                          text: each.name,
                          value: String(each.jabatan_id),
                        }))}
                      />
                    )}
                  />
                  {errors.jabatan_id && <p className="mt-1 text-xs text-red-500">{errors.jabatan_id.message}</p>}
                </div> */}
                <InputLabelled
                  name="tmt_kgb_selanjutnya"
                  type="date"
                  additionalLabelStyle="hidden"
                  additionalStyle="hidden"
                  label="TMT KGB Selanjutnya"
                  errorMessage={errors.tmt_kgb_selanjutnya?.message}
                  isError={errors.tmt_kgb_selanjutnya}
                  validation={{ ...register('tmt_kgb_selanjutnya', { required: false }) }}
                />
                <div className="mt-5 sm:col-span-6">
                  <Controller
                    control={control}
                    name={'file_name_berkas_kgb'}
                    rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
                    render={({ field: { onChange, value } }) => (
                      <UploadWrapper
                        allowedTypes={['pdf']}
                        handleUploadChange={(files: FileObject[]) => {
                          setValue('file_id_berkas_kgb', files[0].id);
                          onChange(files[0].name);
                        }}
                      >
                        {({ loading }) => (
                          <div
                            className={classNames(
                              'flex items-center justify-between border-[1px] p-3',
                              errors.file_name_berkas_kgb ? 'border-red-500' : ''
                            )}
                          >
                            <div>
                              <div className="text-sm text-gray-600">{value || 'Bukti Berkas KGB'}</div>
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
                  ></Controller>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat KGB
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
