import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../../action/CommonAction';
import { JabatanAPI } from '../../../../constants/APIUrls';
import { SnackbarType } from '../../../../reducer/CommonReducer';
import { TambahJabatanReq, UpdateJabatanRes } from '../../../../types/api/JabatanAPI';
import { Status } from '../../../../types/Common';
import { callAPI } from '../../../../utils/Fetchers';
import {
  ButtonRows,
  DropdownSelect,
  HeaderComponents,
  InputLabelled,
} from '../../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

interface FormState {
  name: string;
  jenis_jabatan: number;
  kelas_jabatan: number;
  is_dikti: number;
}

export default function FormJabatan(props: UploadFormProps) {
  const { open, setOpen, onSuccess } = props;
  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<FormState>();

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<TambahJabatanReq, UpdateJabatanRes>(
      JabatanAPI.POST_JABATAN_INSERT,
      {
        name: formData?.name,
        jenis_jabatan: Number(formData?.jenis_jabatan),
        kelas_jabatan: Number(formData?.kelas_jabatan),
        is_dikti: Number(formData?.is_dikti),
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
        <HeaderComponents navigateBack={toggleModal} headerTitle="Tambah Jabatan" />
        <form onSubmit={handleSubmit(submitHandler)}>
          <DropdownSelect
            moreOptions={<option value={'3'}>JPT: Jabatan Pimpinan Tinggi</option>}
            isError={errors.jenis_jabatan}
            errorMessage={errors.jenis_jabatan?.message}
            validation={{ ...register('jenis_jabatan', { required: 'Silahkan Pilih Jenis Jabatan' }) }}
            label="Tipe Jabatan"
            defaultOption="Silahkan Pilih"
            firstOption="JA: Jabatan Administrasi"
            secondOption="JF: Jabatan Fungsional"
            formVerification="jenis_jabatan"
          />
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
          <DropdownSelect
            isError={errors.is_dikti}
            errorMessage={errors.is_dikti?.message}
            validation={{ ...register('is_dikti', { required: 'Silahkan Pilih Apakah Jabatan Dikti' }) }}
            label="Jabatan Dikti"
            defaultOption="Silahkan Pilih"
            firstOption="Ya"
            secondOption="Tidak"
            formVerification="is_dikti"
          />

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
