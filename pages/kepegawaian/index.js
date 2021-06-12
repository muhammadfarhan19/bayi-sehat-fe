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
        <title>Kepegawaian | Intra DIKTI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Profil</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Kepegawaian
              </h2>

              {/* Profile Info */}
              <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quod, voluptates odio expedita id eligendi, iure quam ad ullam temporibus vel saepe laudantium? Hic eum porro error ea veniam nisi.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, facere quod. Quisquam maxime nemo facilis explicabo corporis minima, officia quibusdam ab animi, ducimus accusamus numquam culpa est, esse laboriosam dicta!
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, facere quod. Quisquam maxime nemo facilis explicabo corporis minima, officia quibusdam ab animi, ducimus accusamus numquam culpa est, esse laboriosam dicta!
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, facere quod. Quisquam maxime nemo facilis explicabo corporis minima, officia quibusdam ab animi, ducimus accusamus numquam culpa est, esse laboriosam dicta!

              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis alias modi deserunt nulla in quidem. Voluptate molestias assumenda dicta esse officiis qui distinctio sunt provident tenetur, pariatur magnam fugit iure.
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
