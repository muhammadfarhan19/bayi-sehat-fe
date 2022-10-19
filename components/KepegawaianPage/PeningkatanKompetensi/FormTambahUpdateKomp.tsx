import React from 'react';

import {
  ButtonRows,
  HeaderComponents,
  InputLabelled,
} from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

interface UploadFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  selectedId?: number;
}

function FormTambahUpdateKomp(props: UploadFormProps) {
  const { open, setOpen, selectedId } = props;
  const toggleModal = () => {
    setOpen(!open);
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
        {/* <form onSubmit={handleSubmit(submitHandler)}> */}
        <div className="mt-5 sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700">Tahun</label>
          <div className="mt-1 sm:col-span-2 sm:mt-0">
            <select
              // {...register('jenis_jabatan', { required: 'Silahkan Pilih Jenis Jabatan' })}
              name={'jenis_jabatan'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {/* {(jabatanList || []).map((item, index) => ( */}
              <option key={null} value={'1'}>
                2022
              </option>
              {/* ))} */}
            </select>
            {/* {errors.jenis_jabatan && <p className="mt-1 text-xs text-red-500">{errors.jenis_jabatan.message}</p>} */}
          </div>
        </div>

        <InputLabelled
          isError={null}
          errorMessage={null}
          validation={null}
          name="kelas_jabatan"
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
        {/* </form> */}
      </div>
    </div>
  );
}

export default FormTambahUpdateKomp;
