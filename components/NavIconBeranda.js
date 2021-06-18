import { CalendarIcon } from "@heroicons/react/outline";
import Link from "next/link";
function NavIconBeranda(props) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 mb-3 gap-2">
      <Link href="#">
        <a className="rounded-lg shadow bg-white p-1 hover:bg-gray-100 ">
          <div className=" px-7 text-indigo-600">
            <CalendarIcon />
          </div>
          <div className="text-xs text-center text-gray-500">Kepegawaian</div>
        </a>
      </Link>
      <Link href="#">
        <a className="rounded-lg shadow bg-white p-1 hover:bg-gray-100">
          <div className=" px-7 text-indigo-600">
            <CalendarIcon />
          </div>
          <div className="text-xs text-center text-gray-500">Keuangan</div>
        </a>
      </Link>
      <Link href="#">
        <a className="rounded-lg shadow bg-white p-1 hover:bg-gray-100">
          <div className=" px-7 text-indigo-600">
            <CalendarIcon />
          </div>
          <div className="text-xs text-center text-gray-500">Barang Milik Negara</div>
        </a>
      </Link>
      <Link href="#">
        <a className="rounded-lg shadow bg-white p-1 hover:bg-gray-100">
          <div className=" px-7 text-indigo-600">
            <CalendarIcon />
          </div>
          <div className="text-xs text-center text-gray-500">Naskah Dinas Elektronik</div>
        </a>
      </Link>
      <Link href="#">
        <a className="rounded-lg shadow bg-white p-1 hover:bg-gray-100">
          <div className=" px-7 text-indigo-600">
            <CalendarIcon />
          </div>
          <div className="text-xs text-center text-gray-500">Monitoring</div>
        </a>
      </Link>
      <Link href="#">
        <a className="rounded-lg shadow bg-white p-1 hover:bg-gray-100">
          <div className=" px-7 text-indigo-600">
            <CalendarIcon />
          </div>
          <div className="text-xs text-center text-gray-500">Evaluasi Organisasi</div>
        </a>
      </Link>

    </div>
  );
}

export default NavIconBeranda;
