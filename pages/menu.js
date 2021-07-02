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
function menu(props) {
  return (
    <MainLayout>
      <div className="grid grid-cols-2 gap-4 mx-4" >
        <Link href="/kepegawaian">
          <a className="rounded-lg text-center shadow bg-white px-3 py-4 hover:bg-gray-100 ">
            <div className="p-2 text-indigo-600">
              <UsersIcon className="w-14 h-14 text-center mx-auto" />
            </div>
            <div className="text-xs text-center text-gray-500">Kepegawaian</div>
          </a>
        </Link>
        <Link href="/keuangan">
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
        </Link>
      </div>
    </MainLayout>
  );
}

export default menu;
