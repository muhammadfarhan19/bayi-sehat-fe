import TabelDataKehadiran from "../../../components/kepegawaian/kehadiran/TabelDataKehadiran";
import TabelKlaimKehadiran from "../../../components/kepegawaian/kehadiran/TabelKlaimKehadiran";
import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import menu from "../menu";

function TabelKehadiran() {
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
    <div className="bg-white rounded-md shadow">
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

export default function Kehadiran() {
  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">
        <ModuleNavigation menu={menu} />
        <div className="grid grid-cols-1 gap-4 lg:col-span-4 transition duration-500 ease-in-out">
          <DashboardKehadiran />
          <TabelKlaimKehadiran />
          <TabelKehadiran />
        </div>
      </div>
    </MainLayout>
  );
}
