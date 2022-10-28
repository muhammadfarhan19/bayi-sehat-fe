import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { PeningkatanKompAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { PostDetailPeningkatanReq, PostPeningkatanRes } from '../../../types/api/PeningkatanKompetensiAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import {
  ButtonRows,
  HeaderComponents,
  InputLabelled,
} from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

const dateToday = new Date();
interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  selectedId?: number;
}

interface FormState {
  tahun: number;
  peningkatan_kompetensi: string;
}

function FormTambahUpdateKomp(props: UploadFormProps) {
  const { open, setOpen, selectedId } = props;
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
  } = useForm<FormState>();

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostDetailPeningkatanReq, PostPeningkatanRes>(
      PeningkatanKompAPI.POST_PENINGKATAN_KOMP_INSERT,
      {
        tahun: year,
        peningkatan_kompetensi: formData?.peningkatan_kompetensi,
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
                <option value={0}>Silahkan Pilih</option>
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
