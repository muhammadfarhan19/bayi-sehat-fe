import { AdjustmentsIcon } from "@heroicons/react/solid";
import { useState } from "react";
import MainLayout from "../../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../../components/navigation/ModuleNavigation";

function TabelKelolaCuti(params) {
  const [showAdvancedFilter, setshowAdvancedFilter] = useState(false);

  function toggleAdvancedFilter() {
    setshowAdvancedFilter(!showAdvancedFilter);
  }

  const daftar_cuti = [
    {
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      deskripsi: "Pergi Belajar ke Jerman",
      unit_kerja: "Sekretariat Direktorat Jendral Pendidikan Tinggi",
      tgl_mulai: "1 Januari 2023",
      tgl_selesai: "1 Maret 2023",
      status: 1,
    },
    {
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      deskripsi: "Pergi Belajar ke Jerman",
      unit_kerja: "Sekretariat Direktorat Jendral Pendidikan Tinggi",
      tgl_mulai: "1 Januari 2023",
      tgl_selesai: "1 Maret 2023",
      status: 1,
    },
    {
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      deskripsi: "Pergi Belajar ke Jerman",
      unit_kerja: "Sekretariat Direktorat Jendral Pendidikan Tinggi",
      tgl_mulai: "1 Januari 2023",
      tgl_selesai: "1 Maret 2023",
      status: 1,
    },
    {
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      deskripsi: "Pergi Belajar ke Jerman",
      unit_kerja: "Sekretariat Direktorat Jendral Pendidikan Tinggi",
      tgl_mulai: "1 Januari 2023",
      tgl_selesai: "1 Maret 2023",
      status: 1,
    },
    {
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      deskripsi: "Pergi Belajar ke Jerman",
      unit_kerja: "Sekretariat Direktorat Jendral Pendidikan Tinggi",
      tgl_mulai: "1 Januari 2023",
      tgl_selesai: "1 Maret 2023",
      status: 1,
    },
    {
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      deskripsi: "Pergi Belajar ke Jerman",
      unit_kerja: "Sekretariat Direktorat Jendral Pendidikan Tinggi",
      tgl_mulai: "1 Januari 2023",
      tgl_selesai: "1 Maret 2023",
      status: 1,
    },
  ];
  return (
    <>
      <div className="bg-white rounded-md shadow">
        {/* Header */}
        <div className="flex alig-center mb-3 pt-3 px-5">
          <div className="text-lg font-medium text-gray-900 my-auto">
            Kelola Cuti
          </div>
          <div className="ml-auto my-auto flex">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Cari..."
            />
            <button
              className="border border-gray-300 rounded-md ml-1 p-2 focus:outline-none focus:bg-gray-50 "
              onClick={toggleAdvancedFilter}
            >
              <AdjustmentsIcon className="w-5  h-5 text-gray-400 animate-pulse "></AdjustmentsIcon>
            </button>

          </div>
          <div className="flex">
            <button className="focus:outline-none rounded-md p-2 text-sm border border-indigo-600 text-indigo-600 px-5 ml-1 hover:bg-gray-50"> Tambah Cuti </button>
          </div>
        </div>
        {/* Advanced Filter */}
        {showAdvancedFilter ? (
          <div className="flex px-5 mb-3">
            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="nip"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                NIP
              </label>
              <input
                type="text"
                name="nip"
                id="nip"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="nama"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Nama
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="Unit Kerja"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Unit Kerja
              </label>
              <input
                type="text"
                name="Unit Kerja"
                id="Unit Kerja"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="tgl_mulai"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Tgl. Mulai
              </label>
              <input
                type="date"
                name="tgl_mulai"
                id="tgl_mulai"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="unit_kerja"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Tgl. Selesai
              </label>
              <input
                type="date"
                name="unit_kerja"
                id="unit_kerja"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="unit_kerja"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Status
              </label>
              <input
                type="text"
                name="unit_kerja"
                id="unit_kerja"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex ">
          <div className="-my-2 overflow-x-auto sm:mx-0 ">
            <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg">
                <table className="w-full overflow-visible rounded-lg bg-gray-100 table-auto ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        NIP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Unit Kerja
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Tgl. Mulai
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Tgl. Selesai
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftar_cuti.map((df_cuti, df_cutiIdx) => (
                      <tr
                        key={df_cutiIdx}
                        className={
                          df_cutiIdx % 2 === 0
                            ? "bg-white hover:bg-gray-100"
                            : "bg-gray-50 hover:bg-gray-100"
                        }
                      >
                        <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                          {df_cuti.nip}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                          {df_cuti.nama}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                          {df_cuti.unit_kerja}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                          {df_cuti.tgl_mulai}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                          {df_cuti.tgl_selesai}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                          {df_cuti.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default function KelolaCuti() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <ModuleNavigation />
          <div className="grid grid-cols-1 gap-4 lg:col-span-2 transition duration-500 ease-in-out">
            <TabelKelolaCuti />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
