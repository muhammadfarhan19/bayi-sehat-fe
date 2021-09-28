import Link from "next/link";
import {
  CalendarIcon,
  UsersIcon,
  CashIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  ChartBarIcon,
  LinkIcon,
} from "@heroicons/react/outline";
import MainLayout from "../components/layouts/MainLayout";
import BottomNav from "../components/BottomNav";
import { UserGroupIcon } from "@heroicons/react/outline";
import { MailIcon } from "@heroicons/react/solid";
import WorkInProgress from "../components/WorkInProgress";
function menu(props) {
  return (
    <MainLayout>
      <div className="grid grid-cols-2 gap-4 mx-4 mb-3">
        <Link href="/kegiatan">
          <a className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 ">
            <div className="p-2 text-indigo-600">
              <UserGroupIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Kegiatan</div>
          </a>
        </Link>

        <a
          className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 "
          href="https://bit.ly/formsaran-intra"
        >
          <div className="p-2 text-indigo-600">
            <MailIcon className="w-14 h-14 text-center mx-auto" />
          </div>
          <div className="text-xs text-center text-gray-500">
            Saran Menu dan Fitur
          </div>
        </a>
        {/* <Link href="/peminjaman/ruangan">
          <a className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 ">
            <div className="p-2 text-indigo-600">
              <UserGroupIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Peminjaman Ruangan</div>
          </a>
        </Link>
        <Link href="/kepegawaian">
          <a className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 ">
            <div className="p-2 text-indigo-600">
              <UsersIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Peminjaman Barang</div>
          </a>
        </Link>
        <Link href="/kepegawaian">
          <a className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 ">
            <div className="p-2 text-indigo-600">
              <UsersIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Kunjungan Tamu</div>
          </a>
        </Link>
        <Link href="/kepegawaian">
          <a className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 ">
            <div className="p-2 text-indigo-600">
              <UsersIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Admin</div>
          </a>
        </Link> */}
        {/* <Link href="/keuangan">
          <a className="rounded-lg shadow bg-white px-3 py-4 hover:bg-gray-100">
            <div className=" p-2 text-indigo-600">
              <CashIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Keuangan</div>
          </a>
        </Link>
        <Link href="#">
          <a className="rounded-lg shadow bg-white px-3 py-4 hover:bg-gray-100">
            <div className=" p-2 text-indigo-600">
              <ShoppingBagIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">
              Barang Milik Negara
            </div>
          </a>
        </Link>
        <Link href="#">
          <a className="rounded-lg shadow bg-white px-3 py-4 hover:bg-gray-100">
            <div className=" p-2 text-indigo-600">
              <DocumentTextIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">
              Naskah Dinas Elektronik
            </div>
          </a>
        </Link>
        <Link href="#">
          <a className="rounded-lg shadow bg-white px-3 py-4 hover:bg-gray-100">
            <div className=" p-2 text-indigo-600">
              <ChartBarIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Monitoring</div>
          </a>
        </Link>
        <Link href="#">
          <a className="rounded-lg shadow bg-white px-3 py-4 hover:bg-gray-100">
            <div className=" p-2 text-indigo-600">
              <LinkIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">
              Evaluasi Organisasi
            </div>
          </a>
        </Link> */}
        <div className="col-span-2">
          <WorkInProgress />
        </div>
      </div>
      <BottomNav />
    </MainLayout>
  );
}

export default menu;
