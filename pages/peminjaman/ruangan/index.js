import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormPengajuanRuangan from "../../../components/FormPengajuanRuangan"
import DetailPengajuanRuangan from "../../../components/DetailPengajuanRuangan"
import {
  expiry,
  getUser,
} from "../../../components/shared/fetcher/FetcherHooks";
import MainLayout from "../../../components/layouts/MainLayout";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
  DocumentTextIcon,
  LinkIcon,
  LocationMarkerIcon,
  PlusIcon,
  UserGroupIcon,
  ZoomInIcon,
} from "@heroicons/react/outline";
import FetcherLoading from "../../../components/shared/loading/fetcherLoading";
const data = [
  {
    id: "001",
    nama_kegiatan: "Kegiatan Lorem ipsum dolor sit  ",
    tanggal: "1 Januari 2021",
    jam: "1 Januari 2021",
    ruangan: "Ruang Rapat Aston Lantai 2",
    unit_kerja: "Tata Usaha Setditjen DIKTI",
  },
  {
    id: "002",
    nama_kegiatan: "Kegiatan Lorem ipsum dolor sit  ",
    tanggal: "1 Januari 2021",
    jam: "1 Januari 2021",
    ruangan: "Ruang Rapat Aston Lantai 2",
    unit_kerja: "Tata Usaha Setditjen DIKTI",
  },
  {
    id: "002",
    nama_kegiatan: "Kegiatan Lorem ipsum dolor sit  ",
    tanggal: "1 Januari 2021",
    jam: "1 Januari 2021",
    ruangan: "Ruang Rapat Aston Lantai 2",
    unit_kerja: "Tata Usaha Setditjen DIKTI",
  },
  {
    id: "002",
    nama_kegiatan: "Kegiatan Lorem ipsum dolor sit  ",
    tanggal: "1 Januari 2021",
    jam: "1 Januari 2021",
    ruangan: "Ruang Rapat Aston Lantai 2",
    unit_kerja: "Tata Usaha Setditjen DIKTI",
  },
  {
    id: "002",
    nama_kegiatan: "Kegiatan Lorem ipsum dolor sit  ",
    tanggal: "1 Januari 2021",
    jam: "1 Januari 2021",
    ruangan: "Ruang Rapat Aston Lantai 2",
    unit_kerja: "Tata Usaha Setditjen DIKTI",
  },
  {
    id: "002",
    nama_kegiatan: "Kegiatan Lorem ipsum dolor sit  ",
    tanggal: "1 Januari 2021",
    jam: "1 Januari 2021",
    ruangan: "Ruang Rapat Aston Lantai 2",
    unit_kerja: "Tata Usaha Setditjen DIKTI",
  },
];
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const doGetUser = getUser();
  useEffect(async () => {
    if (!user) {
      try {
        let rUser = await doGetUser();
        // console.log('mantap'+rUser)
        setUser(rUser);
      } catch (e) {
        router.push("/login");
      }
    }
  }, [user]);
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get("token");

  const check = expiry();

  useEffect(() => {
    (async () => {
      try {
        const checkExpiry = await check();
        if (checkExpiry.responseData.data !== null) {
          setLoadPage(true);
        } else {
          router.push("/login");
        }
      } catch (e) {
        router.push("/login");
      }
    })();
  }, []);

  if (!loadPage) {
    return (
      <>
        <FetcherLoading />
      </>
    );
  }

  return (
    <MainLayout single="true">
      <div className="container mx-auto pb-5">
        <div className="flex py-4">
          <button
            className="  text-gray-200 flex text-sm"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="ml-2 h-4 w-4 my-auto mr-4" />{" "}
          </button>
          <div className=" text-gray-100 my-auto  text-center">
            Peminjaman Ruangan
          </div>
        </div>
        <div className="bg-white rounded-2xl py-3 mb-2 shadow">
          <div className="md:flex  px-5">
            <div className="">
              <div className="card-title">Riwayat Peminjaman</div>
              <p className="text-sm text-gray-400">
                Riwayat dan pengajuan peminjaman ruangan
              </p>
            </div>
            <FormPengajuanRuangan/>
            
          </div>
          <div className="hidden">
            <div className="-my-2 overflow-x-auto sm:mx-0 ">
              <div className="py-2 overflow-visible  align-start inline-block min-w-full sm:px-0 lg:px-0">
                <div className=" overflow-visible border-b border-gray-200 sm:rounded-lg">
                  <table className="w-full overflow-visible rounded-lg bg-gray-100 table-auto ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                        >
                          Kegiatan
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                        >
                          Tanggal Mulai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                        >
                          Tanggal Selesai
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 "
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={
                            dataIdx % 2 === 0
                              ? "bg-white hover:bg-gray-100"
                              : "bg-gray-50 hover:bg-gray-100"
                          }
                        >
                          <td className="w-10 px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                            {data.id}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {data.nama_kegiatan}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 truncate">
                            {data.tanggal_mulai}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {data.tanggal_selesai}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900 text-right">
                            <button className="border border-indigo-600 text-indigo-600 px-4 mx-1 py-1 rounded">
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
                        <DetailPengajuanRuangan/>
      </div>
    </MainLayout>
  );
}
