import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ListKenaikan from "../../../components/kepegawaian/kenaikan-gaji-berkala/ListKenaikan";
import { AdjustmentsIcon } from "@heroicons/react/outline";

function TabelDinas() {
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
  const df = [
    {
      tgl_surat: "3 Januari 2021",
      kode: "0513",
      jenis:"SPPD",
      isi_penugasan:"PKKM",
      path_surat: "#",
      nomor_surat: "4471/PKKM/E.1",
      unit_kerja: "Tata Usaha Setditjen",
      tgl_mulai: "1 Januari 2021",
      tgl_selesai: "2 Januari 2021",
      lama: "1 Hari",
    },
    {
      tgl_surat: "3 Januari 2021",
      kode: "0513",
      jenis:"SPPD",
      isi_penugasan:"PKKM",
      path_surat: "#",
      nomor_surat: "4471/PKKM/E.1",
      unit_kerja: "Tata Usaha Setditjen",
      tgl_mulai: "1 Januari 2021",
      tgl_selesai: "2 Januari 2021",
      lama: "1 Hari",
    },
    {
      tgl_surat: "3 Januari 2021",
      kode: "0513",
      jenis:"SPPD",
      isi_penugasan:"PKKM",
      path_surat: "#",
      nomor_surat: "4471/PKKM/E.1",
      unit_kerja: "Tata Usaha Setditjen",
      tgl_mulai: "1 Januari 2021",
      tgl_selesai: "2 Januari 2021",
      lama: "1 Hari",
    },
  ];
  return (
    <>
      <div className="bg-white rounded-md shadow">
        {/* Header */}
        <div className="flex alig-center mb-3 pt-3 px-5">
          <div className="text-lg font-medium text-gray-900 my-auto">
            Daftar Dinas
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
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="nip"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Tanggal Surat
              </label>
              <input
                type="date"
                name="nip"
                id="nip"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="nip"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Kode Penugasan
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
                Surat Penugasan 
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
                Isi Penugasan
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
                Tanggal Penugasan
              </label>
              <input
                type="date"
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
            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="">
                <table className="w-full overflow-visible rounded-lg bg-gray-100 table-auto ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 truncate"
                      >
                        Tanggal Surat
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Jenis
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Kode
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Surat
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
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider truncate"
                      >
                        Lama Hari
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {df.map(
                      (d, dIdx) => (
                        <tr
                          key={dIdx}
                          className={
                            dIdx % 2 === 0
                              ? "bg-white hover:bg-gray-100"
                              : "bg-gray-50 hover:bg-gray-100"
                          }
                        >
                          <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                            {d.tgl_surat}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {d.jenis}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {d.kode}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {d.nomor_surat}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {d.unit_kerja}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {d.tgl_mulai}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {d.tgl_selesai}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {d.lama}
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

export default function Dinas() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (typeof token === "undefined") {
      router.push("/login");
    } else {
      setLoadPage(true);
    }
  }, [token]);

  if (!loadPage) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation />
          <div className="grid grid-cols-1 gap-4 items-start lg:col-span-3">
            <TabelDinas />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
