import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../action/CommonAction';
import { JabatanAPI, KepegawaianAPI, StrukturOrganisasiAPI } from '../../constants/APIUrls';
import { StrukturKepegawaianRole } from '../../constants/Resource';
import { SnackbarType } from '../../reducer/CommonReducer';
import { GetJabatanReq, JabatanData } from '../../types/api/JabatanAPI';
import { GetPegawaiListData, GetPegawaiListReq } from '../../types/api/KepegawaianAPI';
import {
  DetailStrukturData,
  GetDetailStrukturReq,
  PostStrukturDataReq,
  PostStrukturDataRes,
  PutStrukturDataReq,
  PutStrukturDataRes,
} from '../../types/api/StrukturOrganisasiAPI';
import { Status } from '../../types/Common';
import { callAPI } from '../../utils/Fetchers';
import useCommonApi from '../shared/hooks/useCommonApi';
import AutoComplete from '../shared/Input/ComboBox';

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number;
  namaPegawai?: string;
  role?: number;
}

interface FormState {
  id: number;
  pegawaiId: number;
  namaPegawai: string;
  divisi: string;
  role: number;
}

function ModalStrukturOrganisasi(props: ModalProps) {
  const { open, setOpen, onSuccess, selectedId, namaPegawai, role } = props;
  const [queryPegawai, setQueryPegawai] = React.useState('');
  const [pegawaiId, setPegawaiId] = React.useState('');
  const debounce = React.useRef<number>(0);
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
  } = useForm<FormState>();
  const { data: dataTable } = useCommonApi<GetDetailStrukturReq, DetailStrukturData>(
    StrukturOrganisasiAPI.GET_STRUKTUR_ORGANISASI_VIEW,
    { id: selectedId },
    { method: 'GET' }
  );
  const { data: pegawaiList } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    { page: 1, per_page: 10, status_kepegawaian: 'aktif', status_cpns: [0], nama: queryPegawai },
    { method: 'GET' }
  );
  const pegawaiData = pegawaiList?.list?.find(each => each.pegawai_id === Number(pegawaiId));

  const { data: getJabatan } = useCommonApi<GetJabatanReq, JabatanData>(
    JabatanAPI.GET_JABATAN,
    { page: 1, per_page: 20, jabatan: pegawaiData?.jabatan },
    { method: 'GET' }
  );
  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PutStrukturDataReq, PutStrukturDataRes>(
        StrukturOrganisasiAPI.POST_STRUKTUR_ORGANISASI_UPDATE,
        {
          id: Number(formData.id),
          pegawai_id: Number(formData.pegawaiId),
          divisi: formData.divisi,
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostStrukturDataReq, PostStrukturDataRes>(
        StrukturOrganisasiAPI.POST_STRUKTUR_ORGANISASI_INSERT,
        {
          pegawai_id: Number(formData?.pegawaiId),
          jabatan_id: getJabatan?.list?.[0]?.jabatan_id || 0,
          unit_kerja_id: pegawaiData?.unit_kerja_id || 0,
          divisi: formData.divisi,
          roles: Number(formData.role),
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
      setOpen(!open);
      onSuccess();
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setOpen(!open);
    }
  };

  React.useEffect(() => {
    if (selectedId && dataTable) {
      setValue('id', dataTable?.id);
      setValue('pegawaiId', dataTable?.pegawai_id);
      setValue('divisi', dataTable?.divisi);
      setValue('namaPegawai', dataTable?.name);
    }
  }, [dataTable && selectedId]);

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
            <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-sm transition-all">
              <Dialog.Title as="div" className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedId ? 'Edit Koordinator' : 'Tambah Koordinator'}
                </h3>
                <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
              </Dialog.Title>
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mt-5 sm:col-span-6">
                  <div className="mt-5 sm:col-span-6">
                    <label htmlFor="divisi" className="block text-sm font-medium text-gray-700">
                      Nama Penugasan
                    </label>
                    <div className="mt-1">
                      <input
                        {...register('divisi', {
                          required: 'Mohon Masukkan Nama Penugasan',
                        })}
                        className="inline-block h-9 w-full rounded-md border-2 border-gray-300 px-2 shadow-sm disabled:bg-gray-200 sm:text-sm"
                        name="divisi"
                      />
                      {errors.divisi && <p className="mt-1 text-xs text-red-500">{errors.divisi.message}</p>}
                    </div>
                    <div className="mt-5 sm:col-span-6">
                      <Controller
                        control={control}
                        name="role"
                        rules={{ required: 'Mohon Pilih Role' }}
                        render={({ field: { onChange } }) => (
                          <>
                            <AutoComplete
                              onChange={input => {
                                onChange(input?.value);
                              }}
                              label={'Role'}
                              onQueryChange={queryText => {
                                if (debounce.current) {
                                  clearTimeout(debounce.current);
                                }
                                debounce.current = window.setTimeout(() => {
                                  setQueryPegawai(queryText);
                                }, 500);
                              }}
                              defaultValue={{
                                text:
                                  typeof role === undefined
                                    ? ''
                                    : StrukturKepegawaianRole.find(each => each.value === role)?.text || '',
                                value: String(role),
                              }}
                              options={StrukturKepegawaianRole.map(each => ({
                                text: each.text,
                                value: String(each.value),
                              }))}
                            />
                          </>
                        )}
                      />
                      {errors.pegawaiId && <p className="mt-1 text-xs text-red-500">{errors.pegawaiId.message}</p>}
                    </div>
                    <div className="mt-5 sm:col-span-6">
                      <Controller
                        control={control}
                        name="pegawaiId"
                        rules={{ required: 'Mohon Pilih Nama Pegawai' }}
                        render={({ field: { onChange } }) => (
                          <>
                            <AutoComplete
                              onChange={input => {
                                onChange(input?.value);
                                setPegawaiId(input?.value);
                              }}
                              label={'Nama Pegawai'}
                              onQueryChange={queryText => {
                                if (debounce.current) {
                                  clearTimeout(debounce.current);
                                }
                                debounce.current = window.setTimeout(() => {
                                  setQueryPegawai(queryText);
                                }, 500);
                              }}
                              defaultValue={{
                                text: typeof namaPegawai === 'undefined' ? '' : dataTable?.name || String(namaPegawai),
                                value: String(dataTable?.pegawai_id) || String(namaPegawai),
                              }}
                              options={(pegawaiList?.list || []).map(each => ({
                                text: each.name,
                                value: String(each.pegawai_id),
                              }))}
                            />
                          </>
                        )}
                      />
                      {errors.pegawaiId && <p className="mt-1 text-xs text-red-500">{errors.pegawaiId.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {selectedId ? 'Update' : 'Create'}
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

export default ModalStrukturOrganisasi;
