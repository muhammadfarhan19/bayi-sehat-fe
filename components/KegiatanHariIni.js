import {
  UsersIcon,
  LocationMarkerIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from "../utils/Config";
import { request } from "./shared/fetcher/FetcherHooks";

const kegiatans = [
  {
    id: 1,
    title: "Rapat Pengumuman PKKM",
    type: "Narasumber",
    location: "Hotel Alana",
    department: "Tata Usaha",
    closeDate: "2020-01-07",
    closeDateFull: "19:00",
  },
  {
    id: 2,
    title: "Rapat Pengembangan Super Apps DIKTI",
    type: "Peserta",
    location: "Ruang Rapat Lantai 3",
    department: "Data dan Informasi",
    closeDate: "2020-01-07",
    closeDateFull: "19:00",
  },
  {
    id: 3,
    title: "Rapat Pengembangan Sistem Manajemen Reviewer",
    type: "Peserta",
    location: "Ruang Rapat Lantai 3",
    department: "Tata Usaha",
    closeDate: "2020-01-14",
    closeDateFull: "19:00",
  },
];

function KegiatanHariIni(props) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const form = {};
      form.created_by = user?.id;
      form.user_id = user?.id;
      form.tanggal_mulai = moment().format("Y-MM-DD");
      form.tanggal_selesai = moment().format("Y-MM-DD");
      let urlParameters = Object.entries(form)
        .map((e) => e.join("="))
        .join("&");
      try {
        const getData = await request(
          config.apiHost + "/dinas?" + urlParameters,
          "",
          "get",
          true
        );
        setData(getData.responseData.data);
        console.log(getData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [user]);
  useEffect(() => {
    (async () => {
      try {
        const getData = await request(
          config.apiHost + "/auth/getUser",
          "",
          "get",
          true
        );
        setUser(getData.responseData.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <div className="rounded-lg bg-white shadow px-5 py-5 border-b border-gray-200 ">
      <div className="-ml-4 -mt-4 flex pb-2 justify-between items-center flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Kegiatan hari ini
          </h3>
          <p className="mt-1 text-sm text-gray-500">Tetap semangat!</p>
        </div>
      </div>
      <hr />
      <ul className="divide-y divide-gray-200">
        {data?.map((kegiatan) => (
          <Link href={`/kegiatan/` + kegiatan.id}>
            <li key={kegiatan.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="px-1 py-4 sm:px-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {kegiatan.nama_kegiatan}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {kegiatan.type}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 block sm:justify-between">
                    <div className="">
                      {/* <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />

                      </p> */}
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {kegiatan.lokasi_dinas}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>
                        <time dateTime={kegiatan.tanggal_selesai}>
                          {moment(kegiatan.tanggal_mulai).format("D MMMM YYYY")}{" "}
                          -{" "}
                          {moment(kegiatan.tanggal_selesai).format(
                            "D MMMM YYYY"
                          )}
                        </time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </Link>
        ))}
      </ul>

      <Link href="/kegiatan">
        <button
          type="button"
          className="btn my-1 items-center w-full block py-2 border border-transparent text-xs font-medium rounded-lg shadow-sm text-gray-700 border border-gray-200 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Kegiatan Lainnya
        </button>
      </Link>
    </div>
  );
}

export default KegiatanHariIni;
