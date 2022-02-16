import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import menu from "../../../constants/menu";

function TabelDinas() {
  const daftar_dinas = [
    {
      tanggal: "3 Januari 2021",
      kode_dinas: "00010002",
      surat: "12/12/2122121",
      surat_id: "12/12/2122121",
      tgl_surat:'1 Januari 2021',
      lama_kerja: "2 Hari",
      jenis_dinas: "SPPD",
      isi_penugasan: "Rapat Program Kompetisi Kampus Merdeka",
    },
    {
      tanggal: "3 Januari 2021",
      kode_dinas: "00010002",
      surat: "12/12/2122121",
      surat_id: "12/12/2122121",
      tgl_surat:'1 Januari 2021',
      lama_kerja: "2 Hari",
      jenis_dinas: "Non-SPPD",
      isi_penugasan: "Rapat PKKM",
    },
    {
      tanggal: "3 Januari 2021",
      kode_dinas: "00010002",
      surat: "12/12/2122121",
      surat_id: "12/12/2122121",
      tgl_surat:'1 Januari 2021',
      lama_kerja: "2 Hari",
      jenis_dinas: "Non-SPPD",
      isi_penugasan: "Rapat PKKM",
    },
    {
      tanggal: "3 Januari 2021",
      kode_dinas: "00010002",
      surat: "12/12/2122121",
      surat_id: "12/12/2122121",
      tgl_surat:'1 Januari 2021',
      lama_kerja: "2 Hari",
      jenis_dinas: "Non-SPPD",
      isi_penugasan: "Rapat PKKM",
    },
    {
      tanggal: "3 Januari 2021",
      kode_dinas: "00010002",
      surat: "12/12/2122121",
      surat_id: "12/12/2122121",
      tgl_surat:'1 Januari 2021',
      lama_kerja: "2 Hari",
      jenis_dinas: "Non-SPPD",
      isi_penugasan: "Rapat PKKM",
    },
  ];
  return (
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
        </div>
      </div>
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
                      Kode Dinas
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
                      Lama Kerja
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Jenis Dinas
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                    >
                      Isi Penugasan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {daftar_dinas.map((df_dinas, df_dinasIdx) => (
                    <tr
                      key={df_dinasIdx}
                      className={
                        df_dinasIdx % 2 === 0
                          ? "bg-white hover:bg-gray-100"
                          : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                        {df_dinas.tanggal}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {df_dinas.kode_dinas}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                        <a href="#">{df_dinas.surat}</a>
                        <br />
                        {df_dinas.tgl_surat}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {df_dinas.lama_kerja}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {df_dinas.jenis_dinas}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-gray-900">
                        {df_dinas.isi_penugasan}
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
  );
}

function DashboardKedinasan() {
  return (
    <>
      <div className="bg-white rounded-md shadow ">
        <div className="flex pt-5 px-5">
          <div className="text-lg font-medium text-gray-900 my-auto">
            Dashboard Kedinasan
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 px-5 pb-5 gap-4">
          <div className="border-r">
            <div className="">Dinas SPPD</div>
            <div className="">10</div>
          </div>
          <div className="border-r">
            <div className="">Dinas Non-SPPD</div>
            <div className="">10</div>
          </div>
          <div className="border-r">
            <div className="">Jumlah Dinas</div>
            <div className="">10</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Dinas() {
  return (
    <MainLayout>
      <div className="w-full lg:px-4">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <ModuleNavigation menu={menu} />
          <div className="grid grid-cols-1 gap-4 lg:col-span-2 transition duration-500 ease-in-out">
            <DashboardKedinasan />
            <TabelDinas />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
