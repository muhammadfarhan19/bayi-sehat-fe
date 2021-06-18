import MainLayout from "../components/layouts/MainLayout";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/solid";
import { LoginIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Head from "next/head";
import TambahLogKegiatan from "../components/TambahLogKegiatan";
import TaskKepegawaian from "../components/TaskKepegawaian";
import PengumumanBeranda from "../components/PengumumanBeranda";
import NavIconBeranda from "../components/NavIconBeranda";

const navigation = [
  { name: "Profil", href: "#", current: true, count: "5" },
  { name: "Kalender Kegiatan", href: "#", current: false },
  { name: "Gaji dan Honor", href: "#", current: false, count: "19" },
  { name: "Kepegawaian", href: "#", current: false, count: "20+" },
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
    id: 0,
    title: "WFO 1",
    type: "Wajib",
    location: "Luring",
    department: "Tata Usaha",
    closeDate: "2020-01-07",
    closeDateFull: "7:30 - 15:30",
  },
  {
    id: 1,
    title: "Rapat Pengumuman PKKM",
    type: "Narasumber",
    location: "Luring",
    department: "Tata Usaha",
    closeDate: "2020-01-07",
    closeDateFull: "19:00",
  },
  {
    id: 2,
    title: "Rapat Pengembangan Super Apps DIKTI",
    type: "Peserta",
    location: "Luring",
    department: "Data dan Informasi",
    closeDate: "2020-01-07",
    closeDateFull: "19:00",
  },
  {
    id: 3,
    title: "Rapat Pengembangan Sistem Manajemen Reviewer",
    type: "Peserta",
    location: "Daring",
    department: "Tata Usaha",
    closeDate: "2020-01-14",
    closeDateFull: "19:00",
  },
];
const stats = [
  { label: "Kehadiran", value: "100%", link: "/profil" },
  { label: "Kegiatan", value: 3, link: "/profil" },
  { label: "Sisa Cuti", value: 4, link: "/profil" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Intra DIKTI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-1">
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
                  <div className="text-center">
                    <div className="text-center">
                      <div className="flex-shrink-0">
                        <img
                          className="mx-auto h-20 w-20 rounded-full"
                          src="https://assets-a1.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png?t=o&v=770"
                          alt=""
                        />
                      </div>
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 ">
                        <Link href="/profil">
                          <a className="text-lg font-bold text-gray-900 hover:text-indigo-600 hover:underline">
                            Dr. Ir. Paristiyanti Nurwardani, M.P.
                          </a>
                        </Link>
                        <p className="text-xs font-medium text-gray-600">
                          Sekretaris Direktorat Jenderal DIKTI
                        </p>
                        <Link href="profil">
                          <button
                            type="button"
                            className="text-xs inline-flex items-center px-7 py-1 mt-2 border border-transparent shadow-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <LoginIcon
                              className="-ml-0.5 mr-2 h-4 w-4"
                              aria-hidden="true"
                            />
                            Presensi masuk
                          </button>
                        </Link>
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
                <div className="border-t border-gray-200  grid grid-cols-3 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x ">
                  {stats.map((stat) => (
                    <Link href={stat.link}>
                      <a
                        key={stat.label}
                        className="px-6 py-5 text-sm font-medium text-center hover:bg-gray-50"
                      >
                        <div className="text-gray-900">{stat.value}</div>{" "}
                        <div className="text-gray-600 text-xs text-indigo-600">
                          {stat.label}
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-white shadow px-2 py-5 border-b border-gray-200 sm:px-5 mb-3">
                <div className="-ml-4 -mt-4 flex pb-2 justify-between items-center flex-wrap sm:flex-nowrap">
                  <div className="ml-4 mt-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Kegiatan hari ini
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Tetap semangat!
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
                            <div className="">
                              <p className="flex items-center text-sm text-gray-500">
                                <UsersIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {position.department}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                <LocationMarkerIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {position.location}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <ClockIcon
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
                <button
                  type="button"
                  className="my-1 items-center w-full block py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Kegiatan Lainnya
                </button>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <PengumumanBeranda />
              <NavIconBeranda />
              {/* <TambahLogKegiatan /> */}
              <TaskKepegawaian />
              <div className="rounded-lg bg-white overflow-hidden shadow"></div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
