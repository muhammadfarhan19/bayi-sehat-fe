import MainLayout from "../../components/layouts/MainLayout";
import ProfilNav from "../../components/ProfilNav";
import Head from "next/head";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from "@heroicons/react/solid";
const tabs = [
  { name: "Data Diri Pegawai", href: "#", current: true },
  { name: "Data Diri Pribadi", href: "#", current: false },
  { name: "Riwayat Pendidikan", href: "#", current: false },
];

const user = {
  name: "Chelsea Hagon",
  handle: "chelseahagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageId: "1550525811-e5869dd03032",
  imageUrl:
    "https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png",
};

const datadiri = [
  {
    judul: "Unit kerja",
    deskripsi: "SEKRETARIAT DIREKTORAT JENDERAL PENDIDIKAN TINGGI",
  },
  {
    judul: "Nomor batch",
    deskripsi: "2914-00101",
  },
  {
    judul: "NIP / NIP lama",
    deskripsi: "196305071990022001 / 131878350",
  },
  {
    judul: "Tempat, tanggal lahir",
    deskripsi: "Sukabumi, 07-05-1963",
  },
  {
    judul: "Tanggal CPNS",
    deskripsi: "01-02-1990",
  },
  {
    judul: "Status Kepegawaian",
    deskripsi: "PNS",
  },
  {
    judul: "Jabatan",
    deskripsi: "Rangkap Jabatan",
  },
  {
    judul: "Golongan",
    deskripsi: "IV/c",
  },
  {
    judul: "Tanggal mulai golongan",
    deskripsi: "01-10-2017",
  },
  {
    judul: "Pangkat",
    deskripsi: "Pembina Utama Muda",
  },
  {
    judul: "Masa kerja",
    deskripsi: "27 tahun, 8 bulan",
  },
  {
    judul: "Status",
    deskripsi: "Aktif",
  },
  {
    judul: "Karpeg",
    deskripsi: "F 160772",
  },
];

const positions = [
  {
    id: 1,
    title: "Rapat Pengumuman PKKM",
    type: "Narasumber",
    location: "Luring",
    department: "Tata Usaha",
    closeDate: "2020-01-07",
    closeDateFull: "19:00 7 Januari 2020",
  },
  {
    id: 2,
    title: "Rapat Pengembangan Super Apps DIKTI",
    type: "Peserta",
    location: "Luring",
    department: "Data dan Informasi",
    closeDate: "2020-01-07",
    closeDateFull: "19:00 7 Januari 2020",
  },
  {
    id: 3,
    title: "Rapat Pengembangan Sistem Manajemen Reviewer",
    type: "Peserta",
    location: "Daring",
    department: "Tata Usaha",
    closeDate: "2020-01-14",
    closeDateFull: "19:00 7 Januari 2020",
  },
];
const stats = [
  { label: "Kehadiran Bulan Ini", value: "100%" },
  { label: "Kegiatan Hari Ini", value: 3 },
  { label: "Sisa Cuti", value: 4 },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profil() {
  return (
    <MainLayout>
      <Head>
        <title>Rian Ardiana Prapanca | Intra DIKTI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Profil</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <ProfilNav />
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Profil
              </h2>

              {/* Profile Info */}
              <div className="rounded-lg bg-white overflow-hidden shadow mb-3">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex  items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="mx-auto h-14 w-14 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className=" text-left ml-2 sm:mt-0  sm:text-left">
                        <p className="text-sm  font-bold text-gray-900 sm:text-2xl">
                          Dr. Ir. Paristiyanti Nurwardani, M.P.
                        </p>
                        <p className="text-xs sm:text-sm  font-medium text-gray-600">
                          Sekretaris Direktorat Jenderal DIKTI
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
                <div className="mb-3">
                  <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                      Pilih menu
                    </label>
                    <select
                      id="tabs"
                      name="tabs"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      defaultValue={tabs.find((tab) => tab.current).name}
                    >
                      {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <div className="border-b border-gray-100">
                      <nav className="-mb-px flex" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                              tab.current
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                              "whitespace-nowrap pb-2 px-10 border-b-2  text-sm"
                            )}
                            aria-current={tab.current ? "page" : undefined}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                <table className="w-full">
                  {datadiri.map((data) => (
                    <tr className="border-b ">
                      <td className="py-2 text-sm">{data.judul}</td>
                      <td className="py-2 text-sm">{data.deskripsi}</td>
                    </tr>
                  ))}
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
