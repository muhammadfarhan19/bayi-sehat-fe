import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { expiry, getUser, request } from "../../components/shared/fetcher/FetcherHooks";
import config from "../../utils/Config";

import MainLayout from "../../components/layouts/MainLayout";
import {
  ArrowLeftIcon,
  CalendarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PlusIcon,

} from "@heroicons/react/outline";
import FetcherLoading from "../../components/shared/loading/fetcherLoading";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import moment from "moment";

export default function Home() {

  const [tanggalMulai, setTanggalMulai] = useState(moment().format('Y-MM-DD'));
  const [tanggalSelesai, setTanggalSelesai] = useState(moment().format('Y-MM-DD'));
  const router = useRouter();
  const [showAdvancedFilter, setshowAdvancedFilter] = useState(false);
  const [Data, setData] = useState([]);

  function toggleAdvancedFilter() {
    setshowAdvancedFilter(!showAdvancedFilter);
  }
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
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const getData = await request(config.apiHost + '/auth/getUser', '', 'get', true);
        setUser(getData.responseData.data);
      } catch (e) {
        console.log(e)
      }
    })();
  }, []);

  const [daftarUnit, setDaftarUnit] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const getData = await request(config.apiHost + '/organizations/'+user.organization_id+'/topDown', '', 'get', true);
        setDaftarUnit(getData.responseData.data);
      } catch (e) {
        console.log(e)
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      const form = {}
      form.created_by = user?.id
      form.user_id = user?.id
      form.tanggal_mulai = tanggalMulai
      form.tanggal_selesai = tanggalSelesai
      let urlParameters = Object.entries(form).map(e => e.join('=')).join('&');
      try {
        const getData = await request(config.apiHost + '/dinas?'+urlParameters,'' , 'get', true);
        setData(getData.responseData.data)
        console.log(getData)
      } catch (e) {
        console.error(e)
      }
    })();
  }, [user,tanggalMulai,tanggalSelesai]);

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
            className="btn  text-gray-200 flex text-sm"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="ml-2 h-4 w-4 my-auto mr-4" />{" "}
          </button>
          <div className=" text-gray-100 my-auto  text-center">Kegiatan</div>
        </div>
        <div className="bg-white rounded-2xl pt-5 pb-2 shadow">
          <div className="block md:flex px-5">
            <div className="card-title mb-3 md:mb-0">Rekap Kegiatan</div>
            <div className="md:ml-auto flex ">
              <div className="flex-grow md:flex">
                <div className="grid grid-cols-2 flex-grow gap-2">
                  <div className="md:ml-2 relative flex-grow border border-gray-300 rounded-md px-2 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="tanggal"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Tanggal mulai
                    </label>
                    <input
                      type="date"
                      name="tanggal_mulai"
                      onChange={(e)=>setTanggalMulai(e.target.value)}
                      value={tanggalMulai}
                      id="tanggal_mulai"
                      className="block w-full text-xs border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>

                  <div className="md:ml-2 relative flex-grow border border-gray-300 rounded-md px-2 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="tanggal"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Tanggal selesai
                    </label>
                    <input
                      type="date"
                      name="tanggal_selesai"
                      onChange={(e)=>setTanggalSelesai(e.target.value)}
                      value={tanggalSelesai}
                      id="tanggal_selesai"
                      className="block w-full text-xs border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>
                </div>
                {/* <button className="ml-2 border rounded px-2 btn hidden" onClick={toggleAdvancedFilter}>
                  <AdjustmentsIcon className="w-5  h-5 text-gray-900 animate-pulse"></AdjustmentsIcon>
                </button> */}
              </div>
            </div>
            <Link href="/kegiatan/tambah">
              <div className="fixed bottom-0 right-0 p-5">
                <button className="animate-bounce w-14 h-14 text-xs text-center  bg-indigo-600 text-white text-gray-100 rounded-full focus:outline-none">
                  <PlusIcon className="h-5 w-5 mx-auto" /> Tambah
                </button>
              </div>
            </Link>
          </div>

          {showAdvancedFilter ? (
            <div className="flex px-5 py-4 md:py-2 mb-3">
              <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="tanggal"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Unit Kerja
                </label>
                <select name="" id="" className="block w-full border-0 text-left py-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs">
                  {daftarUnit.map((dt)=>
                    <option value={dt.organization_id}>{dt.organization_name}</option>
                  )}
                </select>
              </div>

              <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                <label
                  htmlFor="nama"
                  className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                >
                  Nama Pegawai
                </label>
                <select name="" id="" className="block w-full border-0 text-left py-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs">
                  <option value="">Rian Ardiana </option>
                  <option value="">Data dan Informasi Setditjen Dikti</option>
                </select>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {Data ? Data.map((dt, dtIdx) => (
          <Link href={`/kegiatan/` + dt.id}>
            <div className="cursor-pointer bg-white my-1 rounded-2xl shadow p-5 text-sm grid grid-cols-12">
              <div className="grid col-span-1 text-center lg:text-2xl lg:font-bold text-gray-600">{dtIdx+1}</div>
              <div className="grid col-span-11">
                <div className="font-medium mb-1">{dt.nama_kegiatan}</div>
                <div className="flex mb-1 text-xs ">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="my-auto">
                    {moment(dt.tanggal_mulai).format("D MMMM YYYY")} - {moment(dt.tanggal_selesai).format("D MMMM YYYY")}
                  </span>
                </div>
                <div className="flex mb-1 text-xs">
                  <LocationMarkerIcon className="h-4 w-4 mr-2" />{" "}
                  <span className="my-auto">{dt.lokasi_dinas}</span>{" "}
                </div>
                {dt.link_meeting ? (
                  <div className="flex text-xs">
                    <LinkIcon className="h-4 w-4 mr-2" />{" "}
                    <a href={dt.link_meeting} className="text-blue-800">
                      {dt.link_meeting}
                    </a>{" "}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Link>
        )):<div className="text-center text-lg my-5 font-medium text-gray-700">Kegiatan tidak ditemukan</div>}
      </div>
    </MainLayout>
  );
}
