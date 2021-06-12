import MainLayout from "../../components/layouts/MainLayout";
import ProfilNav from "../../components/ProfilNav";
import Head from 'next/head'
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "@heroicons/react/solid";


const navigation = [
  { name: "Profil", href: "#", current: true },
  { name: "Kalender Kegiatan", href: "#", current: false },
  { name: "Gaji dan Honor", href: "#", current: false, treeview:true },
  { name: "Kepegawaian", href: "#", current: false, treeview:true },
  { name: "Barang Milik Negara", href: "#", current: false },
  { name: "Pengaturan", href: "#", current: false },
];
const user = {
  name: "Chelsea Hagon",
  handle: "chelseahagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageId: "1550525811-e5869dd03032",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
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
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                lorem mantap
              </h2>

              {/* Profile Info */}
              <div className="rounded-lg bg-white overflow-hidden shadow mb-3">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                      <div className="flex-shrink-0">
                        <img
                          className="mx-auto h-20 w-20 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p className="text-sm font-medium text-gray-600">
                          Selamat datang,
                        </p>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                          Rian Ardiana Prapanca
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          Web Developer
                        </p>
                      </div>
                    </div>
                    {/* <div className="mt-5 flex justify-center sm:mt-0">
                      <a
                        href="#"
                        className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View profile
                      </a>
                    </div> */}
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="px-6 py-5 text-sm font-medium text-center"
                    >
                      <div className="text-gray-900">{stat.value}</div>{" "}
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
                <div className="-ml-4 -mt-4 flex pb-2 justify-between items-center flex-wrap sm:flex-nowrap">
                  <div className="ml-4 mt-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Kegiatan
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Berikut kegiatan yang harus anda hadiri hari ini, tetap
                      semangat!
                    </p>
                  </div>
                </div>
                <hr />
                <ul className="divide-y divide-gray-200">
                  {positions.map((position) => (
                    <li key={position.id}>
                      <a href="#" className="block hover:bg-gray-50">
                        <div className="px-1 py-4 sm:px-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {position.title}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {position.type}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <UsersIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {position.department}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <LocationMarkerIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {position.location}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <CalendarIcon
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <p>
                                <time dateTime={position.closeDate}>
                                  {position.closeDateFull}
                                </time>
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                    <ProfilNav/>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
