import MainLayout from "../components/layouts/MainLayout";
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  ClockIcon,
} from "@heroicons/react/solid";


import Link from "next/link";
import Head from "next/head";
import TambahLogKegiatan from "../components/TambahLogKegiatan";
import TaskKepegawaian from "../components/TaskKepegawaian";
import PengumumanBeranda from "../components/PengumumanBeranda";
import NavIconBeranda from "../components/NavIconBeranda";
import KartuProfilBeranda from "../components/KartuProfilBeranda";
import KegiatanHariIni from "../components/KegiatanHariIni";
import InfoKehadiranDashboard from "../components/InfoKehadiranDashboard";
import RealisasiSkp from "../components/RealisasiSkp";


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
                <KartuProfilBeranda></KartuProfilBeranda>
                
              </div>
                <RealisasiSkp/>
              <KegiatanHariIni/>
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
              <TambahLogKegiatan />
              <TaskKepegawaian />
              <InfoKehadiranDashboard/>
              <div className="rounded-lg bg-white overflow-hidden shadow"></div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
