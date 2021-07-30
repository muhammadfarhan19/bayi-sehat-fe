import { RefreshIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function TabelDataKehadiran() {
  const [loadComponent, setloadComponent] = useState(false);
  const [showAdvancedFilter, setshowAdvancedFilter] = useState(false);

  function toggleAdvancedFilter() {
    setshowAdvancedFilter(!showAdvancedFilter);
  }

  if (loadComponent) {
    return (
      <div className="bg-white p-3 rounded-md shadow text-center ">
        <div className="animate-pulse">
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-400 rounded w-1/4"></div>
            <div class="space-y-2">
              <div class="h-10 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        {/* <RefreshIcon height="50px" className="mx-auto text-gray-200 animate-spin"></RefreshIcon> */}
      </div>
    );
  }
  const daftar_kehadiran = [
    {
      tanggal: "3 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "Tepat Waktu",
    },
    {
      tanggal: "2 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "Tepat Waktu",
    },
    {
      tanggal: "1 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "Tepat Waktu",
    },
    {
      tanggal: "1 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "Tepat Waktu",
    },
  ];
  return (
    <>
      <div className="bg-white rounded-md shadow">
        {/* Header */}
        <div className="flex alig-center mb-3 pt-3 px-5">
          <div className="text-lg font-medium text-gray-900 my-auto">
            Daftar Kehadiran Pegawai
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
        </div>
        {/* Advanced Filter */}
        {showAdvancedFilter ? (
          <div className="flex px-5 mb-3">
            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="tanggal"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                id="tanggal"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
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
                htmlFor="unit_kerja"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Unit Kerja
              </label>
              <input
                type="text"
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
        {/* Body */}
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
                        Tanggal
                      </th>
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
                        Jam Masuk
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Jam Keluar
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
                    {daftar_kehadiran.map(
                      (daftar_kehadiran, daftar_kehadiranIdx) => (
                        <tr
                          key={daftar_kehadiranIdx}
                          className={
                            daftar_kehadiranIdx % 2 === 0
                              ? "bg-white hover:bg-gray-100"
                              : "bg-gray-50 hover:bg-gray-100"
                          }
                        >
                          <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                            {daftar_kehadiran.tanggal}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.nip}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {daftar_kehadiran.nama}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.unit_kerja}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.jam_masuk}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.jam_keluar}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.status}
                          </td>
                        </tr>
                      )
                    )}
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
