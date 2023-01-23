import { UploadIcon } from '@heroicons/react/outline';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../action/CommonAction';
import { CutiAPI } from '../../constants/APIUrls';
import { SnackbarType } from '../../reducer/CommonReducer';
import {
  GetCutiListParams,
  GetCutiListRes,
  GetCutiReq,
  GetQuotaPengajuanRes,
  PostCutiReq,
  PostCutiRes,
} from '../../types/api/CutiAPI';
import { Status } from '../../types/Common';
import { classNames } from '../../utils/Components';
import { formatDate } from '../../utils/DateUtil';
import { callAPI } from '../../utils/Fetchers';
import ModalKehadiran from '../KehadiranPage/ModalKehadiran';
import ModalDetail from '../KehadiranPage/shared/ModalDetail';
import {
  DropdownPicker,
  InputLabelled,
} from '../KepegawaianPage/DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';
import { CircleProgress } from '../shared/CircleProgress';
import FileLoader from '../shared/FileLoader';
import useCommonApi from '../shared/hooks/useCommonApi';
import usePersonalData from '../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../shared/Input/UploadWrapper';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination';
import { PengajuanType, StatusPengajuan } from './Shared/_resource';

interface FormState {
  pegawai_id: number;
  tanggal_klaim: string;
  jenis_pengajuan: number;
  catatan?: string;
  file_id: string;
  file_name: string;
  tanggal_selesai: string;
}

function KlaimCutiSakit() {
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const dispatch = useDispatch();
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  const [detailModalState, setDetailModalState] = React.useState<{
    status: 'success' | 'failed';
    message: string | null;
  }>({
    status: 'success',
    message: null,
  });

  const [filterState, setFilterState] = React.useState<GetCutiListParams>({
    page: 1,
    per_page: 20,
  });

  const personalPegawaiData = usePersonalData();

  const { data: kuotaPengajuanCuti, mutate: mutationQuota } = useCommonApi<GetCutiReq, GetQuotaPengajuanRes>(
    CutiAPI.GET_CUTI_QUOTA,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id) },
    { method: 'GET' },
    { skipCall: !personalPegawaiData?.pegawai_id }
  );

  const { data: listPengajuanCuti, mutate: mutationList } = useCommonApi<GetCutiReq, GetCutiListRes>(
    CutiAPI.GET_CUTI_LIST,
    { ...filterState, pegawai_id: Number(personalPegawaiData?.pegawai_id) },
    { method: 'GET' },
    { skipCall: !personalPegawaiData?.pegawai_id }
  );

  const {
    control,
    formState: { errors },
    watch,
    register,
    handleSubmit,
    getValues,
    setValue,
    resetField,
  } = useForm<FormState>();

  const twoMBFileSize = 2000000;
  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const changeFilterState = (inputState: Partial<GetCutiListParams>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setFilterState(newState), pageAffected ? 0 : 800);
  };

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostCutiReq, PostCutiRes>(
      CutiAPI.POST_CUTI,
      {
        pegawai_id: Number(personalPegawaiData?.pegawai_id),
        tanggal_klaim: formData?.tanggal_klaim,
        tanggal_selesai: formData?.tanggal_selesai,
        jenis_pengajuan: Number(formData?.jenis_pengajuan),
        catatan: formData?.catatan ?? '',
        files: [
          {
            document_name: formData?.file_name,
            document_uuid: formData?.file_id,
          },
        ],
      },
      { method: 'POST' }
    );
    if (resSubmit.status === 200 && resSubmit?.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      handleShowForm(!formModalState?.open);
      mutationList();
      mutationQuota();
      resetField('catatan');
      resetField('file_id');
      resetField('file_name');
      resetField('jenis_pengajuan');
      resetField('tanggal_klaim');
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    }
  };

  if (!personalPegawaiData?.pegawai_id) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Kuota Klaim Cuti</h3>
            <div className="mt-4 overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm text-gray-500">Sisa Kuota Klaim Cuti</dt>
              <dd className="mt-1 text-3xl font-semibold text-indigo-700">{kuotaPengajuanCuti?.sisa_pengajuan} Hari</dd>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Pengajuan Klaim Cuti dan Sakit</h3>
          <InputLabelled
            isError={null}
            isUneditable={true}
            errorMessage={null}
            validation={null}
            name="nama"
            value={personalPegawaiData?.nama}
            type="text"
            label="Nama"
          />
          <InputLabelled
            isError={errors.tanggal_klaim}
            errorMessage={errors.tanggal_klaim?.message}
            validation={{ ...register('tanggal_klaim', { required: 'Silahkan Pilih Tanggal Klaim' }) }}
            name="tanggal_klaim"
            type="date"
            label="Tanggal Mulai"
          />
          <InputLabelled
            isError={errors.tanggal_selesai}
            errorMessage={errors.tanggal_selesai?.message}
            validation={{ ...register('tanggal_selesai', { required: 'Silahkan Pilih Tanggal Selesai' }) }}
            name="tanggal_selesai"
            type="date"
            label="Tanggal Selesai"
          />
          <DropdownPicker
            isError={errors.jenis_pengajuan}
            errorMessage={errors.jenis_pengajuan?.message}
            validation={{ ...register('jenis_pengajuan', { required: 'Silahkan Pilih Jenis Pengajuan' }) }}
            label="Jenis Pengajuan"
            defaultOption="Silahkan Pilih"
            firstValue={1}
            firstOption="Cuti"
            secondValue={2}
            secondOption="Cuti Sakit"
            formVerification="jenis_pengajuan"
            moreOptions={(PengajuanType || []).map(item => {
              return (
                <>
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                </>
              );
            })}
          />
          <InputLabelled
            isError={errors.catatan}
            errorMessage={errors.catatan?.message}
            validation={{ ...register('catatan', { required: 'Silahkan Masukkan Alasan Klaim' }) }}
            name="catatan"
            type="text"
            label="Alasan"
          />
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Unggah Surat Dokter atau dokumen pendukung lainnya
            </label>
            <Controller
              control={control}
              name={'file_name'}
              rules={{ required: 'Mohon upload file yang ingin disimpan.' }}
              render={({ field: { onChange, value } }) => (
                <UploadWrapper
                  allowedTypes={['pdf']}
                  allowedSize={twoMBFileSize}
                  handleUploadChange={(files: FileObject[]) => {
                    setValue('file_id', files[0].id);
                    onChange(files[0].name);
                  }}
                >
                  {({ loading }) => (
                    <div
                      className={classNames(
                        'flex items-center justify-center space-x-2 rounded-md border-[1px] p-2',
                        errors.file_name ? 'border-red-500' : ''
                      )}
                    >
                      <div className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-sky-100 py-2">
                        <div>
                          <div className="text-sm text-gray-400">
                            {value || 'Masukan dokumen permohonan dalam bentuk PDF max 2mb'}
                          </div>
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
                    </div>
                  )}
                </UploadWrapper>
              )}
            />
            <div className="mt-5 flex flex-row justify-end">
              <button
                onClick={
                  watch('tanggal_klaim') && watch('jenis_pengajuan') && watch('file_name') && watch('catatan')
                    ? () => handleShowForm(!formModalState?.open)
                    : handleSubmit(submitHandler)
                }
                type="submit"
                className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Klaim Cuti
              </button>
            </div>
          </div>
        </div>
        {formModalState.open ? (
          <ModalKehadiran
            open={formModalState.open}
            withCustomTitle
            modalTitle="Klaim Cuti dan Sakit"
            setOpen={(open: boolean) => handleShowForm(open)}
            handleSubmission={handleSubmit(submitHandler)}
            selectedId={formModalState?.selectedId}
            name={`: ${personalPegawaiData?.nama}`}
            tanggal={`: ${getValues('tanggal_klaim')} s.d ${getValues('tanggal_selesai')}`}
            nip={`: ${personalPegawaiData?.nip}`}
            jenisPengajuan={`: ${getValues('jenis_pengajuan') == 1 ? 'Cuti' : 'Cuti Sakit'}`}
            alasan={`: ${getValues('catatan')}`}
            documentValue={getValues('file_id')}
            dokumen={`: ${getValues('file_name')}`}
            pegawaiID={personalPegawaiData?.pegawai_id}
          />
        ) : null}
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Data Klaim Cuti dan Sakit</h3>
          </div>

          <div className="flex w-full flex-row gap-x-[16px]">
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700"> Dari Tanggal</p>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={e => changeFilterState({ tgl_mulai: e.target.value })}
              />
            </div>
            <div className="w-[202px] pb-2">
              <p className="text-sm font-medium text-gray-700"> Sampai Tanggal</p>
              <input
                type="date"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                onChange={e => changeFilterState({ tgl_selesai: e.target.value })}
              />
            </div>
          </div>
          <div className="my-[24px] overflow-x-auto sm:mx-0 ">
            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="sm:rounded-lg">
                <table className="w-full table-auto overflow-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tanggal Mulai
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tanggal Selesai
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Jenis Pengajuan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Alasan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Dokumen
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(listPengajuanCuti?.list || []).map((data, dataIdx) => {
                      const formatDatePengajuan: string = data?.tanggal
                        ? formatDate(new Date(data?.tanggal), 'dd MMMM yyyy')
                        : '-';
                      const formatDatePengajuanSelesai: string = data?.tanggal_selesai
                        ? formatDate(new Date(data?.tanggal_selesai), 'dd MMMM yyyy')
                        : '-';

                      const statType = PengajuanType.find(item => item?.value === data?.type);
                      return (
                        <tr key={data?.id} className={'bg-white hover:bg-gray-100'}>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{formatDatePengajuan}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{formatDatePengajuanSelesai}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{statType?.text}</td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.note}</td>
                          <td className="px-6 py-4 text-xs font-medium text-blue-900 underline">
                            {data?.files?.[0]?.document_name?.length === 0 ? (
                              '-'
                            ) : (
                              <FileLoader uuid={data?.files?.[0]?.document_uuid} asLink>
                                Lihat
                              </FileLoader>
                            )}
                          </td>
                          {data?.status === StatusPengajuan.Diterima ? (
                            <td
                              className="cursor-pointer px-6 py-4 text-xs font-medium text-green-700"
                              onClick={() => {
                                setDetailModalState({
                                  status: 'success',
                                  message: data?.admin_note || '-',
                                });
                              }}
                            >
                              Diterima
                            </td>
                          ) : data?.status === StatusPengajuan.Ditolak ? (
                            <td
                              className="cursor-pointer px-6 py-4 text-xs font-medium text-red-700"
                              onClick={() => {
                                setDetailModalState({
                                  status: 'failed',
                                  message: data?.admin_note || '-',
                                });
                              }}
                            >
                              Ditolak
                            </td>
                          ) : (
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">Diproses</td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Pagination
                  onChange={value => {
                    changeFilterState({ page: value });
                  }}
                  totalData={listPengajuanCuti ? listPengajuanCuti?.pagination.total_data : 0}
                  perPage={filterState?.per_page}
                  page={filterState?.page}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalDetail
        open={!!detailModalState.message}
        setOpen={() => setDetailModalState({ ...detailModalState, message: null })}
        status={detailModalState.status}
        message={detailModalState.message || ''}
      />
    </>
  );
}

export default KlaimCutiSakit;
