import { Tab } from "@headlessui/react";
import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import menu from "../menu";

function TabelKehadiran() {
  const daftar_kehadiran = [
    {
      tanggal: "Minggu, 7 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "",
      jam_keluar: "",
      status: "Libur",
    },
    {
      tanggal: "Sabtu, 6 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "Absen Tepat Waktu",
    },
    {
      tanggal: "Jumat, 5 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "Absen Tepat Waktu",
    },
    {
      tanggal: "Kamis, 4 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      absen_masuk: "8:31",
      absen_keluar: "5:31",
      status: "Absen Terlambat",
    },
    {
      tanggal: "Rabu, 3 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "SPPD",
    },
    {
      tanggal: "Selasa, 2 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      absen_masuk:'',
      absen_keluar:'',
      status: "Cuti",
    },
    {
      tanggal: "Senin, 1 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      absen_masuk: "8:00",
      absen_keluar: "5:00",
      status: "Absen Tepat Waktu",
    },
  ];
  return (
    <div className="bg-white ">
      {/* Header */}
      <div className="flex alig-center mb-3 pt-3 px-5">
        <div className="text-lg font-medium text-gray-900 my-auto">
          Daftar Kehadiran
        </div>
        <div className="ml-auto my-auto flex">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Cari..."
          />
        </div>
      </div>
      {/* Body */}
      <div className=" ">
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
                      Absen Masuk
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Absen Keluar
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
                          {daftar_kehadiran.jam_masuk}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {daftar_kehadiran.jam_keluar}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {daftar_kehadiran.absen_masuk}
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {daftar_kehadiran.absen_keluar}
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
  );
}

function TabelKlaimKehadiran() {
  const data = [
    {
      kode: "KK001",
      tanggal: "3 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      catatan: "Lupa absen masuk karena sedang dijalan",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status_code: 1,
      status: "Diterima",
    },
    {
      kode: "KK002",
      tanggal: "3 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      catatan: "Lupa absen pulang karena sedang dijalan",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status_code: 0,
      status: "Ditolak",
    },
  ];
  return (
    <div className="bg-white ">
      {/* Header */}
      <div className="flex alig-center mb-3 pt-3 px-5">
        <div className="text-lg font-medium text-gray-900 my-auto">
          Pengajuan Klaim Kehadiran
        </div>
        <div className="ml-auto my-auto flex">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Cari..."
          />
        </div>
      </div>
      {/* Body */}
      <div className=" ">
        <div className="-my-2 overflow-x-auto sm:mx-0 ">
          <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
            <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg">
              <table className="w-full overflow-visible rounded-lg bg-gray-100 table-auto ">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider truncate"
                    >
                      Kode Pengajuan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider truncate"
                    >
                      Tanggal Pengajuan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Tanggal Kehadiran
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Catatan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((dt, dtIdx) => (
                    <tr
                      key={dtIdx}
                      className={
                        dtIdx % 2 === 0
                          ? "bg-white hover:bg-gray-100"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {dt.kode}
                      </td>
                      <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {dt.tanggal}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {dt.tanggal}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {dt.catatan}
                      </td>
                      {dt.status_code == 1 && (
                        <td className="px-6 py-4 text-xs font-medium text-center text-green-600">
                          {dt.status}
                        </td>
                      )}
                      {dt.status_code == 0 && (
                        <td className="px-6 py-4 text-xs font-medium text-center text-red-600">
                          {dt.status}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabelCuti() {
  const data = [
    {
      kode: "CT002",
      tanggal: "4 Januari 2021",
      jenis_cuti: "Tahunan",
      status_code: 0,
      status: "Ditolak",
    },
    {
      kode: "CT001",
      tanggal: "3 Januari 2021",
      jenis_cuti: "Sakit",
      status_code: 1,
      status: "Diterima",
    },
  ];
  return (
    <div className="bg-white ">
      {/* Header */}
      <div className="flex alig-center mb-3 pt-3 px-5">
        <div className="text-lg font-medium text-gray-900 my-auto">
          Pengajuan Klaim Kehadiran
        </div>
        <div className="ml-auto my-auto flex">
          <input
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Cari..."
          />
        </div>
      </div>
      {/* Body */}
      <div className=" ">
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
                      Kode Pengajuan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider truncate"
                    >
                      Tgl. Pengajuan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Tgl. Mulai Cuti
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Tgl. Selesai Cuti
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Jenis Cuti
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-center text-gray-500 tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((dt, dtIdx) => (
                    <tr
                      key={dtIdx}
                      className={
                        dtIdx % 2 === 0
                          ? "bg-white hover:bg-gray-100"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {dt.kode}
                      </td>
                      <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {dt.tanggal}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {dt.tanggal}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {dt.tanggal}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {dt.jenis_cuti}
                      </td>
                      {dt.status_code == 1 && (
                        <td className="px-6 py-4 text-xs font-medium text-center text-green-600">
                          {dt.status}
                        </td>
                      )}
                      {dt.status_code == 0 && (
                        <td className="px-6 py-4 text-xs font-medium text-center text-red-600">
                          {dt.status}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardKehadiran() {
  return (
    <>
      <div className="bg-white rounded-md shadow ">
        <div className="flex pt-5 px-5">
          <div className="text-lg font-medium text-gray-900 my-auto">
            Dashboard Kehadiran
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 pb-5 gap-4">
          <div className="border-r">
            <div className="">Kehadiran bulan ini</div>
            <div className="">22/22 (100%)</div>
          </div>
          <div className="border-r">
            <div className="">Kuota klaim bulan ini</div>
            <div className="">5/10 (50%)</div>
          </div>
        </div>
      </div>
    </>
  );
}
function Tabs() {
  const tabs = [
    { name: "Kehadiran", href: "#", current: true },
    { name: "Pengajuan Klaim Kehadiran", href: "#", current: false },
    { name: "Pengajuan Cuti", href: "#", current: false },
  ];

  return (
    <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
      <div className="mb-3">
        <Tab.Group vertical>
          <Tab.List className="mb-3 flex">
            {tabs.map((tab) => (
              <Tab
                className={({ selected }) =>
                  selected
                    ? "flex-grow border-indigo-500 text-indigo-600 whitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                    : "flex-grow border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                }
                key={tab.name}
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <TabelKehadiran />
            </Tab.Panel>
            <Tab.Panel>
              <TabelKlaimKehadiran />
            </Tab.Panel>
            <Tab.Panel>
              <TabelCuti />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default function Kehadiran() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
        <ModuleNavigation menu={menu} />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3 transition duration-500 ease-in-out">
          <DashboardKehadiran />
          <Tabs />
        </div>
      </div>
    </MainLayout>
  );
}
