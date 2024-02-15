import { UploadIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../action/CommonAction';
import { KlaimKehadiranList } from '../../constants/APIUrls';
import { SnackbarType } from '../../reducer/CommonReducer';
import {
  GetKehadiranDataList,
  GetKehadiranList,
  GetMaxPengajuanDataReq,
  GetPengajuanInfo,
  PostKehadiranData,
  PostKehadiranReqData,
} from '../../types/api/KlaimKehadiranAPI';
import { Status } from '../../types/Common';
import { classNames } from '../../utils/Components';
import { callAPI } from '../../utils/Fetchers';
import {
  DropdownPicker,
  InputLabelled,
} from '../KepegawaianPage/DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';
import { CircleProgress } from '../shared/CircleProgress';
import FileLoader from '../shared/FileLoader';
import { withErrorBoundary } from '../shared/hocs/ErrorBoundary';
import useCommonApi from '../shared/hooks/useCommonApi';
import usePersonalData from '../shared/hooks/usePersonalData';
import UploadWrapper, { FileObject } from '../shared/Input/UploadWrapper';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination';
import ModalKehadiran from './ModalKehadiran';
import ModalDetail from './shared/ModalDetail';

interface FormState {
  user_id: number;
  unit_kerja_id: number;
  tanggal_klaim: string;
  jenis_pengajuan: string;
  alasan_klaim: string;
  file_id: string;
  file_name: string;
}

function KlaimKehadiran() {
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const {
    control,
    formState: { errors },
    setValue,
    register,
    handleSubmit,
    getValues,
    watch,
  } = useForm<FormState>();
  const dispatch = useDispatch();

  const personalPegawaiData = usePersonalData();
  const isPpnpn = Number(personalPegawaiData?.status_cpns || 0) === 2;

  const [detailModalState, setDetailModalState] = React.useState<{
    status: 'success' | 'failed';
    message: string | null;
  }>({
    status: 'success',
    message: null,
  });

  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: number }>({
    open: false,
    selectedId: undefined,
  });

  const [filterState, setFilterState] = React.useState<GetKehadiranList>({
    page: 1,
    per_page: 20,
  });

  const { data: getKlaimKehadiran } = useCommonApi<GetKehadiranList, GetKehadiranDataList>(
    KlaimKehadiranList.GET_KLAIM_KEHADIRAN_LIST,
    { ...filterState, user_id: personalPegawaiData?.user_id },
    { method: 'GET' },
    { revalidateOnMount: true, skipCall: !personalPegawaiData?.user_id }
  );

  const { data: klaimInfo } = useCommonApi<GetMaxPengajuanDataReq, GetPengajuanInfo>(
    KlaimKehadiranList.GET_KLAIM_KEHADIRAN_INFO,
    { pegawai_id: Number(personalPegawaiData?.pegawai_id) },
    { method: 'GET' }
  );

  /**
   * @description `Jenis Pengajuan` Options Goes here, future changes by Map.
   */
  const TelatMasuk = {
    TELAT_MASUK_OPTIONS: klaimInfo ? klaimInfo?.jenis_klaim?.[0]?.label : 'Izin Telat Masuk',
    TELAT_MASUK_VALUE: klaimInfo ? klaimInfo?.jenis_klaim?.[0]?.name : 'TELAT_MASUK',
  };

  const PulangCepat = {
    PULANG_CEPAT_OPTIONS: klaimInfo ? klaimInfo?.jenis_klaim?.[1]?.label : 'Izin Pulang Cepat',
    PULANG_CEPAT_VALUE: klaimInfo ? klaimInfo?.jenis_klaim?.[1]?.name : 'PULANG_CEPAT',
  };

  const TidakAbsenDatang = {
    TIDAK_ABSEN_DATANG_OPTIONS: klaimInfo
      ? klaimInfo?.jenis_klaim?.[2]?.label
      : 'Keterangan lupa rekam kehadiran datang',
    TIDAK_ABSEN_DATANG_VALUE: klaimInfo ? klaimInfo?.jenis_klaim?.[2]?.name : 'TIDAK_ABSEN_DATANG',
  };

  const TidakAbsenPulang = {
    TIDAK_ABSEN_PULANG_OPTIONS: klaimInfo
      ? klaimInfo?.jenis_klaim?.[3]?.label
      : 'Keterangan lupa rekam kehadiran pulang',
    TIDAK_ABSEN_PULANG_VALUE: klaimInfo ? klaimInfo?.jenis_klaim?.[3]?.name : 'TIDAK_ABSEN_PULANG',
  };

  const KeluarKantor = {
    KELUAR_KANTOR_OPTIONS: klaimInfo ? klaimInfo?.jenis_klaim?.[4]?.label : 'Izin keluar kantor pada jam kerja"',
    KELUAR_KANTOR_VALUE: klaimInfo ? klaimInfo?.jenis_klaim?.[4]?.name : 'KELUAR_KANTOR',
  };

  const isDisabledKlaim = isPpnpn && !klaimInfo?.jenis_klaim?.[0]?.kuota;

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostKehadiranData, PostKehadiranReqData>(
      KlaimKehadiranList.POST_KLAIM_KEHADIRAN_POST,
      {
        peg_id: Number(personalPegawaiData?.pegawai_id),
        tanggal_klaim: format(new Date(formData.tanggal_klaim), 'yyyy-MM-dd'),
        alasan_klaim: formData?.alasan_klaim,
        jenis_pengajuan: formData?.jenis_pengajuan,
        files: [
          {
            document_uuid: formData.file_id,
            document_name: formData.file_name,
          },
        ],
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
      handleShowForm(!formModalState?.open);
      window.location.reload();
    } else if (resSubmit.status === 400 && resSubmit.data?.status === 'KLAIM_REACH_LIMIT') {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Klaim melebihi Kuota',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    } else if (resSubmit.status === 400 && resSubmit.data?.status === 'KLAIM_SUDAH_MELEWATI_BATAS_WAKTU') {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Klaim melebihi Batas Waktu',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setTimeout(() => window.location.reload(), 3000);
    }
  };

  const changeFilterState = (inputState: Partial<GetKehadiranList>) => {
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

  const handleShowForm = (open: boolean, selectedId?: number) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  if (!personalPegawaiData?.pegawai_id && !personalPegawaiData?.user_id) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <React.Fragment>
      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Kuota Klaim</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {(klaimInfo?.jenis_klaim || []).map((data, index) => {
                const quotaData = !isNaN(data?.kuota) ? Number(data?.kuota) : 0;
                const usedQuotaData = !isNaN(data?.used_kuota) ? Number(data?.used_kuota) : 0;
                const substractData = quotaData - usedQuotaData;
                return (
                  <div key={index} className="overflow-hidden rounded-lg bg-gray-100 px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm text-gray-500">Sisa Kuota Klaim {data?.label}</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-700">
                      {substractData} {isPpnpn ? 'Kali' : 'Hari'}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <h3 className="text-xl font-medium leading-6 text-gray-900">Pengajuan Klaim Kehadiran</h3>
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
            onChange={e => alert(e)}
            errorMessage={errors.tanggal_klaim?.message}
            validation={{ ...register('tanggal_klaim', { required: 'Silahkan Pilih Tanggal Klaim Kehadiran' }) }}
            name="tanggal_klaim"
            type="date"
            label="Tanggal Klaim"
            isUneditable={isDisabledKlaim}
          />

          <DropdownPicker
            isError={errors.jenis_pengajuan}
            errorMessage={errors.jenis_pengajuan?.message}
            validation={{ ...register('jenis_pengajuan', { required: 'Silahkan Pilih Jenis Pengajuan' }) }}
            label="Jenis Pengajuan"
            defaultOption="Silahkan Pilih"
            firstValue={TelatMasuk.TELAT_MASUK_VALUE}
            secondValue={PulangCepat.PULANG_CEPAT_VALUE}
            firstOption={TelatMasuk.TELAT_MASUK_OPTIONS}
            secondOption={PulangCepat.PULANG_CEPAT_OPTIONS}
            moreOptions={
              <>
                <option value={TidakAbsenDatang.TIDAK_ABSEN_DATANG_VALUE}>
                  {TidakAbsenDatang.TIDAK_ABSEN_DATANG_OPTIONS}
                </option>
                <option value={TidakAbsenPulang.TIDAK_ABSEN_PULANG_VALUE}>
                  {TidakAbsenPulang.TIDAK_ABSEN_PULANG_OPTIONS}
                </option>
                <option value={KeluarKantor.KELUAR_KANTOR_VALUE}>{KeluarKantor.KELUAR_KANTOR_OPTIONS}</option>
              </>
            }
            formVerification="jenis_pengajuan"
            disabled={isDisabledKlaim}
          />
          <InputLabelled
            isError={errors.alasan_klaim}
            errorMessage={errors.alasan_klaim?.message}
            validation={{ ...register('alasan_klaim', { required: 'Silahkan Masukkan Alasan Klaim' }) }}
            name="alasan_klaim"
            type="text"
            label="Alasan"
            isUneditable={isDisabledKlaim}
          />
          <div className="mt-5 sm:col-span-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Unggah Surat Persetujuan dari Pimpinan
            </label>
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
                          disabled={loading || isDisabledKlaim}
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
                  watch('tanggal_klaim') && watch('jenis_pengajuan') && watch('file_name') && watch('alasan_klaim')
                    ? () => handleShowForm(!formModalState?.open)
                    : handleSubmit(submitHandler)
                }
                type="submit"
                className="rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-200"
                disabled={isDisabledKlaim}
              >
                Klaim Kehadiran
              </button>
            </div>
          </div>
        </div>
        {formModalState.open ? (
          <ModalKehadiran
            open={formModalState.open}
            setOpen={(open: boolean) => handleShowForm(open)}
            handleSubmission={handleSubmit(submitHandler)}
            selectedId={formModalState?.selectedId}
            name={`: ${personalPegawaiData.nama}`}
            tanggal={`: ${getValues('tanggal_klaim')}`}
            nip={`: ${personalPegawaiData?.nip}`}
            jenisPengajuan={`: ${getValues('jenis_pengajuan')}`}
            alasan={`: ${getValues('alasan_klaim')}`}
            dokumen={`: ${getValues('file_name')}`}
            pegawaiID={personalPegawaiData?.pegawai_id}
          />
        ) : null}
      </section>

      <section aria-labelledby="section-1-title">
        <div className="overflow-hidden rounded-lg bg-white px-6 py-6 shadow">
          <div className="mb-5 flex flex-row items-center">
            <h3 className="text-xl font-medium leading-6 text-gray-900">Data Klaim Kehadiran</h3>
            {/* <div className="ml-auto flex">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cari..."
                onChange={e => changeFilterState({ nama: e.target.value })}
              />
              <button
                className="ml-1 rounded-md border border-gray-300 p-2 focus:bg-gray-50 focus:outline-none"
                onClick={() => null}
              >
                <AdjustmentsIcon className="h-5  w-5 animate-pulse text-gray-400" />
              </button>
            </div> */}
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
                        Tanggal
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
                    {(getKlaimKehadiran?.list || []).map((data, dataIdx) => (
                      <tr key={data?.id} className={'bg-white hover:bg-gray-100'}>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.tanggal_klaim}</td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-gray-900" onClick={() => null}>
                          {data?.jenis_pengajuan}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.alasan_klaim}</td>
                        <td className="px-6 py-4 text-xs font-medium text-blue-900">
                          {data?.files?.[0]?.document_name?.length === 0 ? (
                            '-'
                          ) : (
                            <FileLoader uuid={data?.files?.[0]?.document_uuid} asLink>
                              Lihat
                            </FileLoader>
                          )}
                        </td>
                        {data?.status_klaim === 2 ? (
                          <td
                            className="cursor-pointer px-6 py-4 text-xs font-medium text-green-700"
                            onClick={() => {
                              setDetailModalState({
                                status: 'success',
                                message: data?.alasan_tolak || '-',
                              });
                            }}
                          >
                            {data?.status_klaim_str}
                          </td>
                        ) : data?.status_klaim === 3 ? (
                          <td
                            className="cursor-pointer px-6 py-4 text-xs font-medium text-red-700"
                            onClick={() => {
                              setDetailModalState({
                                status: 'failed',
                                message: data?.alasan_tolak || '-',
                              });
                            }}
                          >
                            {data?.status_klaim_str}
                          </td>
                        ) : (
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.status_klaim_str}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  onChange={value => {
                    changeFilterState({ page: value });
                  }}
                  totalData={getKlaimKehadiran ? getKlaimKehadiran?.pagination.total_data : 0}
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
    </React.Fragment>
  );
}

export default withErrorBoundary(KlaimKehadiran);
