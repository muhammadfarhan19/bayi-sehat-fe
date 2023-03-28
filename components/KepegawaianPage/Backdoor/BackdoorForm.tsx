import React from 'react';

import AutoCompletePegawai from '../../shared/Input/AutoCompletePegawai';
import { InputLabelled } from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';

function BackdoorForm() {
  return (
    <section aria-labelledby="section-1-title">
      <div className="overflow-auto rounded-lg bg-white px-6 py-6 pb-10 shadow">
        <h3 className="mb-5 text-xl font-medium leading-6 text-gray-900">Absensi Backdoor</h3>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
          Pegawai
        </label>
        <AutoCompletePegawai placeholder={'Cari Pegawai'} />
        <InputLabelled
          isError={null}
          name="tanggal"
          label="Tanggal"
          validation={null}
          type="date"
          errorMessage={null}
        />
        <InputLabelled isError={null} name="jam" label="Jam" validation={null} type="time" errorMessage={null} />
        <div className="mt-5 flex flex-row justify-end">
          <button
            disabled={true}
            type="button"
            className="rounded border border-transparent bg-indigo-600 px-6 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
          >
            Simpan
          </button>
        </div>
      </div>
    </section>
  );
}

export default BackdoorForm;
