import { Dialog, Transition } from '@headlessui/react';
import { UploadIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../../action/CommonAction';
import { JabatanAPI, MasterAPI } from '../../../../../constants/APIUrls';
import { SnackbarType } from '../../../../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData } from '../../../../../types/api/JabatanAPI';
import { JenisJabatanListData } from '../../../../../types/api/MasterAPI';
import { classNames, composeListDefaultValue } from '../../../../../utils/Components';
import { CircleProgress } from '../../../../shared/CircleProgress';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import usePersonalData from '../../../../shared/hooks/usePersonalData';
import AutoComplete from '../../../../shared/Input/ComboBox';
import UploadWrapper, { FileObject } from '../../../../shared/Input/UploadWrapper';

interface FormState {
  tipe_jabatan: string;
  nama_jabatan: string;
  kumulatif: string;
  tmt: number;
  file_name: string;
  file_id: string;
}

interface UploadFormProps {
  onSuccess: () => void;
  open: boolean;
  selectedId?: string;
  setOpen: (open: boolean) => void;
}

export default function JabatanForm(props: UploadFormProps) {
  const dispatch = useDispatch();
  const personalData = usePersonalData();
  const { onSuccess, open, selectedId, setOpen } = props;
  const [queryJabatan, setQueryJabatan] = React.useState('');
  const debounce = React.useRef<number>(0);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormState>({
    defaultValues: {
      tmt: Date.now(),
    },
  });

  const { data: jenisJabatan } = useCommonApi<null, JenisJabatanListData[]>(MasterAPI.GET_JENIS_JABATAN_LIST, null, {
    method: 'GET',
  });

  const { data: daftarJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: queryJabatan },
    { method: 'GET' }
  );

  // SET default value jenis berkas
  React.useEffect(() => {
    if (jenisJabatan && jenisJabatan.length) {
      setValue('tipe_jabatan', String(jenisJabatan[jenisJabatan.length - 1].id));
    }
  }, [jenisJabatan]);

  const toggleModal = () => {
    setOpen(!open);
  };

  const submitHandler = async () => {
    dispatch(
      setSnackbar({
        show: true,
        message: 'Data berhasil tersimpan.',
        type: SnackbarType.INFO,
      })
    );
    onSuccess();
    setOpen(!open);
  };

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
                    {selectedId ? 'Ubah' : 'Tambah'} Riwayat Jabatan
                  </h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                <form onSubmit={handleSubmit(submitHandler)} className="mt-2">
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

                  <div className="mt-5 sm:col-span-6">
                    <Controller
                      control={control}
                      name="tipe_jabatan"
                      render={({ field: { onChange, value } }) =>
                        value ? (
                          <AutoComplete
                            onChange={value => onChange(value.value)}
                            label={'Jenis Berkas'}
                            defaultValue={composeListDefaultValue(jenisJabatan!, 'id', 'jenis_jabatan', value)}
                            options={(jenisJabatan || [])?.map(each => ({
                              text: each.jenis_jabatan,
                              value: String(each.id),
                            }))}
                          />
                        ) : (
                          <input
                            className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                            disabled={true}
                            type="text"
                            placeholder={'Jenis Berkas'}
                          />
                        )
                      }
                    />
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <Controller
                      control={control}
                      name="nama_jabatan"
                      render={({ field: { onChange } }) => (
                        <AutoComplete
                          onChange={value => onChange(value.value)}
                          label={'Nama Jabatan'}
                          defaultValue={{ text: '', value: '' }}
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
                    {errors.nama_jabatan && <p className="mt-1 text-xs text-red-500">{errors.nama_jabatan.message}</p>}
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">KUMULATIF</label>
                    <div className="mt-1">
                      <input
                        {...register('kumulatif', { required: 'Mohon masukkan informasi kumulatif.' })}
                        autoComplete={'off'}
                        className={classNames(
                          'block w-full rounded-md shadow-sm sm:text-sm',
                          errors.kumulatif
                            ? 'ring-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                        )}
                        type="text"
                      />
                      {errors.kumulatif && <p className="mt-1 text-xs text-red-500">{errors.kumulatif.message}</p>}
                    </div>
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
                            showYearDropdown
                            selected={new Date(value)}
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
                      ></Controller>
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
                    ></Controller>
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
