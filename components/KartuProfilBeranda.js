import Link from "next/link";
import { LoginIcon } from "@heroicons/react/outline";
import Presensi from "./Presensi";

const stats = [
  { label: "Kehadiran", value: "100%", link: "/profil/kepegawaian/kehadiran" },
  { label: "Kegiatan", value: 3, link: "/#" },
];

function KartuProfilBeranda(props) {
  return (
    <>
      <div className="bg-white p-6">
        <div className="text-center">
          <div className="text-center">
            <div className="flex-shrink-0">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
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

              <Presensi></Presensi>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mb-3  grid grid-cols-2 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x ">
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
    </>
  );
}

export default KartuProfilBeranda;
