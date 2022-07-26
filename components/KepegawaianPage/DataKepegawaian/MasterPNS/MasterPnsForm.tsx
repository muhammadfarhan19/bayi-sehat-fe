import { ChevronLeftIcon } from '@heroicons/react/outline';

import { UnitKerjaAPI } from '../../../../constants/APIUrls';
import { GetUnitKerjaData } from '../../../../types/api/UnitKerjaAPI';
import useCommonApi from '../../../shared/hooks/useCommonApi';

const statusPegawai = [
  { id: 'CPNS', title: 'CPNS' },
  { id: 'PNS', title: 'PNS' },
  { id: 'PPNPN', title: 'PPNPN' },
];

const statusAktif = [
  { id: 'Aktif', title: 'Aktif' },
  { id: 'Tidak', title: 'Tidak' },
];

function MasterPnsForm() {
  const { data: unitKerjaList } = useCommonApi<null, GetUnitKerjaData[]>(
    UnitKerjaAPI.GET_UNIT_KERJA_LIST_DIREKTORAT,
    null,
    { method: 'GET' }
  );

  return (
    <form>
      <div className="rounded-lg bg-white shadow">
        <a href="/kepegawaian/rekap-dinas?id=1" className="flex flex-row items-center gap-x-2 py-6 px-6">
          <ChevronLeftIcon className="h-5 w-5" />
          <div>Kembali</div>
        </a>
        <div className="px-6 pb-6">
          <div className="flex flex-col">
            <p className="text-[24px] font-medium text-gray-900">Pendataan Pegawai</p>
            <p className="text-[16px] font-[400] text-[#6B7280]">Data Diri Pegawai</p>
          </div>

          <div className="mt-[32px] w-full">
            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nama"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Unit Organisasi</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
                  <option value="">Semua</option>
                  {(unitKerjaList || []).map((item, index) => (
                    <option key={`options-${index}`} value={item?.unit_kerja_id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                  NIP
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nip"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <label htmlFor="tmpt_lahir" className="block text-sm font-medium text-gray-700">
                  Tempat Lahir
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tmpt_lahir"
                    type="text"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="tgl_lahir" className="block text-sm font-medium text-gray-700">
                  Tanggal Lahir
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tgl_lahir"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <label htmlFor="tmt_cpns" className="block text-sm font-medium text-gray-700">
                  TMT CPNS
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tmt_cpns"
                    type="date"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="status_pegawai" className="block text-sm font-medium text-gray-700">
                  Status Pegawai
                </label>
                <fieldset className="mt-4">
                  <div className="space-y-4">
                    {statusPegawai.map(each => (
                      <div key={each.id} className="flex items-center">
                        <input
                          id={each.id}
                          name="status_pegawai"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={each.id} className="ml-3 block text-sm font-medium text-gray-700">
                          {each.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Unit Organisasi</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
                  <option value=""></option>
                  <option value="1">Lorem Ipsum</option>
                  <option value="1">Lorem Ipsum</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6">
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700">Golongan</label>
                <div className="pt-1 sm:col-span-2 sm:mt-0">
                  <select className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
                    <option value=""></option>
                    <option value="1">Lorem Ipsum</option>
                    <option value="1">Lorem Ipsum</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="tmt_golongan" className="block text-sm font-medium text-gray-700">
                  TMT Golongan
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="tmt_golongan"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <label htmlFor="status_aktif" className="block text-sm font-medium text-gray-700">
                Status Aktif
              </label>
              <fieldset className="mt-4">
                <div className="space-y-4">
                  {statusAktif.map(each => (
                    <div key={each.id} className="flex items-center">
                      <input
                        id={each.id}
                        name="status_aktif"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label htmlFor={each.id} className="ml-3 block text-sm font-medium text-gray-700">
                        {each.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
                  Kerpeg
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nama"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="my-[32px] h-[1px] w-full bg-gray-200"></div>

            <div className="flex flex-col">
              <p className="text-[24px] font-medium text-[#6B7280]">Data Diri Pribadi</p>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
                  <option value=""></option>
                  <option value="1">Laki-laki</option>
                  <option value="2">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700">Status Nikah</label>
              <div className="pt-1 sm:col-span-2 sm:mt-0">
                <select className="w-full appearance-none rounded-md border border-gray-300 px-3 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:bg-gray-200 sm:text-sm">
                  <option value=""></option>
                  <option value="1">Nikah</option>
                  <option value="2">Belum Menikah</option>
                </select>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="jml_anak" className="block text-sm font-medium text-gray-700">
                  Jumlah Anak
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="jml_anak"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
                  NIK
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="nik"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="email"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
                  Alamat
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="alamat"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="npwp" className="block text-sm font-medium text-gray-700">
                  NPWP
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="npwp"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 sm:col-span-6">
              <div className="mt-[27px]">
                <label htmlFor="bpjs" className="block text-sm font-medium text-gray-700">
                  BPJS
                </label>
                <div className="pt-1">
                  <input
                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                    name="bpjs"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-[3rem] flex w-full">
              <div className="ml-auto flex flex-row gap-x-[12px]">
                <button
                  type="button"
                  className="rounded-[6px] bg-[#9CA3AF] py-[9px] px-[17px] text-[14px] text-gray-50"
                  onClick={() => (window.location.href = '/kepegawaian/data-pegawai')}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="inline-flex rounded-[6px] bg-[#4F46E5] py-[9px] px-[17px] text-[14px] text-gray-50"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MasterPnsForm;
