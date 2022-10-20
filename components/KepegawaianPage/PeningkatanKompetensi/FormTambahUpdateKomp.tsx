import React from 'react';

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

function FormTambahUpdateKomp(props: UploadFormProps) {
  const { open, setOpen, selectedId } = props;
  const selectedYear = dateToday.getFullYear() - 10;
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
              name={'jenis_jabatan'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value={'1'}>Silahkan Pilih</option>
              {Array.from(new Array(21), (list, index) => (
                <option key={index} value={selectedYear + index}>
                  {selectedYear + index}
                </option>
              ))}
            </select>
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
