import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { JabatanAPI, MasterAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import {
  GetJabatanDetailReq,
  JabatanDetailData,
  PostJabatanUpdateReq,
  PostJabatanUpdateRes,
  TambahJabatanReq,
  UpdateJabatanRes,
} from '../../../../types/api/JabatanAPI';
import { JenisJabatanListData } from '../../../../types/api/MasterAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import useCommonApi from '../../../shared/hooks/useCommonApi';
import {
  ButtonRows,
  HeaderComponents,
  InputLabelled,
} from '../../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: string;
}

interface FormState {
  name: string;
  jenis_jabatan: number;
  kelas_jabatan: number;
  is_dikti: number;
}

export default function FormJabatan(props: UploadFormProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<FormState>();

  const { data: jabatanList } = useCommonApi<null, JenisJabatanListData[]>(MasterAPI.GET_JENIS_JABATAN_LIST, null, {
    method: 'GET',
  });

  const { data } = useCommonApi<GetJabatanDetailReq, JabatanDetailData>(
    JabatanAPI.GET_JABATAN_DETAIL,
    { id: Number(selectedId) },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (data) {
      setValue('jenis_jabatan', data?.jenis_jabatan);
      setValue('name', data?.name);
      setValue('kelas_jabatan', data?.kelas_jabatan);
      setValue('is_dikti', Number(data?.is_dikti));
    }
  }, [data]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (!selectedId) {
      resSubmit = await callAPI<TambahJabatanReq, UpdateJabatanRes>(
        JabatanAPI.POST_JABATAN_INSERT,
        {
          name: formData?.name,
          jenis_jabatan: Number(formData?.jenis_jabatan),
          kelas_jabatan: Number(formData?.kelas_jabatan),
          is_dikti: Number(formData?.is_dikti),
        },
        { method: 'post' }
      );
    } else {
      resSubmit = await callAPI<PostJabatanUpdateReq, PostJabatanUpdateRes>(
        JabatanAPI.POST_JABATAN_UPDATE,
        {
          jabatan_id: Number(selectedId),
          name: formData?.name,
          jenis_jabatan: Number(formData?.jenis_jabatan),
          kelas_jabatan: Number(formData?.kelas_jabatan),
          is_dikti: Number(formData?.is_dikti),
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

  return (
    <div className="min-w-full px-4 text-center">
      <span className="h-screen align-middle" aria-hidden="true">
        &#8203;
      </span>
      <div className="w-full max-w-full p-6 text-left ">
        <HeaderComponents navigateBack={toggleModal} headerTitle={selectedId ? 'Edit Jabatan' : 'Tambah Jabatan'} />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Tipe Jabatan</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('jenis_jabatan', { required: 'Silahkan Pilih Jenis Jabatan' })}
                name={'jenis_jabatan'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {(jabatanList || []).map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.jenis_jabatan}
                  </option>
                ))}
              </select>
              {errors.jenis_jabatan && <p className="mt-1 text-xs text-red-500">{errors.jenis_jabatan.message}</p>}
            </div>
          </div>

          <InputLabelled
            isError={errors.name}
            errorMessage={errors.name?.message}
            validation={{ ...register('name', { required: 'Silahkan Masukkan Nama Jabatan' }) }}
            name="name"
            type="text"
            label="Nama Jabatan"
          />
          <InputLabelled
            isError={errors.kelas_jabatan}
            errorMessage={errors.kelas_jabatan?.message}
            validation={{ ...register('kelas_jabatan', { required: 'Silahkan Masukkan Kelas Jabatan' }) }}
            name="kelas_jabatan"
            type="text"
            label="Kelas Jabatan"
          />

          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Jabatan Dikti</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('is_dikti', { required: 'Silahkan Pilih Apakah Jabatan Dikti.' })}
                name="is_dikti"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={''}>Silahkan Pilih</option>
                <option value={'1'}>Ya</option>
                <option value={'0'}>Tidak</option>
              </select>
              {errors.is_dikti && <p className="mt-1 text-xs text-red-500">{errors.is_dikti.message}</p>}
            </div>
          </div>

          <ButtonRows
            toggleModal={() => {
              toggleModal();
              window.location.reload();
            }}
            leftButton="Batal"
            rightButton="Simpan"
          />
        </form>
      </div>
    </div>
  );
}
