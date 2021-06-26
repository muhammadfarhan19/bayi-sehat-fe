import { PencilIcon } from "@heroicons/react/solid";
import Link from "next/link";

function RealisasiSkp(props) {
  return (
    <div className="bg-white rounded-lg p-5 shadow mb-3">
      <div className="mb-3">
        <div className=" text-center">Realisasi SKP</div>
        <div className="text-2xl font-bold text-center text-indigo-600">
          80%
        </div>
      </div>
      <Link href="/profil/kepegawaian/skp">
        <button className="text-xs font-medium w-full rounded-lg border border-gray-200 mb-1 text-gray-800 py-2 hover:bg-gray-50 focus:outline-none">
          Lihat Lebih Detail
        </button>
      </Link>
      <button className="text-xs flex items-center justify-center font-medium w-full rounded-lg bg-indigo-600 text-white py-2 hover:bg-indigo-700 focus:outline-none">
        <PencilIcon className="h-4 w-4 mr-2" />
        Buat Catatan Harian
      </button>
    </div>
  );
}

export default RealisasiSkp;
