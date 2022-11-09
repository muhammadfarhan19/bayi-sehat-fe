import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { PeningkatanKompAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import {
  GetDetailPeningkatanReq,
  GetDetailPeningkatanRes,
  PostPeningkatanRes,
  PostUpdatePeningkatanReq,
} from '../../../types/api/PeningkatanKompetensiAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import {
  ButtonRows,
  HeaderComponents,
  InputLabelled,
} from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

const dateToday = new Date();
interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  selectedId?: number;
}

interface FormState {
  id: number;
  tahun: number;
  peningkatan_kompetensi: string;
}

function FormTambahUpdateKomp(props: UploadFormProps) {
  const { open, setOpen, selectedId, onSuccess } = props;
  const selectedYear = dateToday.getFullYear() - 10;
  const dispatch = useDispatch();
  const [year, setYear] = React.useState<number>(selectedYear);
  const toggleModal = () => {
    setOpen(!open);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormState>();

  const { data: editPeningkatan, isValidating } = useCommonApi<GetDetailPeningkatanReq, GetDetailPeningkatanRes>(
    PeningkatanKompAPI.GET_PENINGKATAN_KOMP_DETAIL,
    { id: selectedId },
    { method: 'GET' },
    { skipCall: !selectedId, revalidateOnMount: true }
  );

  useEffect(() => {
    if (!isValidating && selectedId && editPeningkatan) {
      setYear(editPeningkatan?.tahun);
      setValue('peningkatan_kompetensi', editPeningkatan?.peningkatan_kompetensi);
    }
  }, [selectedId, !isValidating]);

  const submitHandler = async (formData: FormState) => {
    let resSubmit;
    if (selectedId) {
      resSubmit = await callAPI<PostUpdatePeningkatanReq, PostPeningkatanRes>(
        PeningkatanKompAPI.POST_PENINGKATAN_KOMP_UPDATE,
        {
          id: selectedId,
          tahun: year,
          peningkatan_kompetensi: formData?.peningkatan_kompetensi,
        },
        { method: 'post' }
      );
    }
    if (resSubmit?.status === 200 && resSubmit?.data?.status === Status.OK) {
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

  if (isValidating) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-w-full rounded-md bg-white px-4 text-center">
      <span className="h-screen align-middle" aria-hidden="true">
        &#8203;
      </span>
      <div className="w-full max-w-full p-6 text-left ">
        <HeaderComponents
          navigateBack={toggleModal}
          headerTitle={selectedId ? 'Perbaharui Peningkatan Kompetensi' : 'Tambah Peningkatan Kompetensi'}
        />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-5 sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Tahun</label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <select
                {...register('tahun', { required: 'Silahkan pilih Tahun.' })}
                onChange={e => setYear(Number(e.target.value))}
                name={'jenis_jabatan'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={selectedId ? year : 0}>{selectedId ? year : 'Silahkan Pilih'}</option>
                {Array.from(new Array(21), (list, index) => (
                  <option key={index} value={selectedYear + index}>
                    {selectedYear + index}
                  </option>
                ))}
              </select>
              {errors.tahun && <p className="mt-1 text-xs text-red-500">{errors.tahun.message}</p>}
            </div>
          </div>

          <InputLabelled
            isError={errors.peningkatan_kompetensi}
            errorMessage={errors.peningkatan_kompetensi?.message}
            validation={{
              ...register('peningkatan_kompetensi', { required: 'Silahkan Masukkan Peningkatan Kompetensi' }),
            }}
            name="peningkatan_kompetensi"
            type="text"
            label="Peningkatan Kompetensi"
          />

          <ButtonRows
            toggleModal={() => {
              toggleModal();
            }}
            leftButton="Batal"
            rightButton={selectedId ? 'Perbaharui' : 'Simpan'}
          />
        </form>
      </div>
    </div>
  );
}

export default FormTambahUpdateKomp;
