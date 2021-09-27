import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { expiry, request } from "../../components/shared/fetcher/FetcherHooks";
import MainLayout from "../../components/layouts/MainLayout";
import config from "../../utils/Config";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/outline";
import FetcherLoading from "../../components/shared/loading/fetcherLoading";
import { RefreshIcon } from "@heroicons/react/solid";
import moment from "moment";

export default function Home() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);

  const [Data, setData] = useState([]);
  const { id } = router.query;

  const [editMode, setEditMode] = useState(false);
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
  useEffect(() => {
    (async () => {
      try {
        const getData = await request(
          config.apiHost + "/dinas/" + id,
          "",
          "get",
          true
        );
        setData(getData.responseData.data);
        // console.log(getData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);
  if (!loadPage) {
    return (
      <>
        <FetcherLoading />
      </>
    );
  }
  if (Data) {
    return (
      <MainLayout single="true">
        <div className="container mx-auto pb-5">
          <div className="flex py-4">
            <button
              className=" btn text-gray-200 flex text-sm"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="ml-2 h-4 w-4 my-auto mr-4" />{" "}
            </button>
            <div className=" text-gray-100 my-auto  text-center">
              Informasi Kegiatan
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow">
            <div className="flex">
              <div className="card-title">Informasi Kegiatan</div>
              <div className="ml-auto">
                {editMode ? (
                  <button
                    className="btn hidden text-sm  border border-indigo-600 px-5 py-1 rounded-md hover:bg-indigo-100 hover:bg-indigo-600 hover:text-gray-100  text-indigo-600 font-medium"
                    onClick={() => setEditMode(false)}
                  >
                    Selesai Edit
                  </button>
                ) : (
                  <button
                    className="btn hidden text-sm  border border-indigo-600 px-5 py-1 rounded-md hover:bg-indigo-100 hover:bg-indigo-600 hover:text-gray-100  text-indigo-600 font-medium"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className="text-gray-400 text-xs  md:text-sm">
              Berikut data kegiatan yang akan atau telah dilaksanakan
            </div>
            <div className="text-xs mb-10 text-gray-400">
              ID Kegiatan = {Data.id}
            </div>
            <form action="">
              <div className=" grid  grid-cols-5 ">
                <div className=" col-span-5 md:col-span-5 ">
                  <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="unitKerja"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Unit Kerja
                    </label>
                    <input
                      type="text"
                      disabled
                      value={Data.organization_name}
                      name="unitKerja"
                      id="unitKerja"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="nama_kegiatan"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Nama Kegiatan
                    </label>
                    <textarea
                      type="text"
                      value={Data.nama_kegiatan}
                      disabled
                      name="nama_kegiatan"
                      id="nama_kegiatan"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="lokasi"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Lokasi
                    </label>
                    <input
                      type="text"
                      disabled
                      value={Data.lokasi_dinas}
                      name="lokasi"
                      id="lokasi"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="lokasi"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Link Meeting (opsional)
                    </label>
                    <input
                      type="text"
                      disabled
                      value={Data.link_meeting}
                      name="lokasi"
                      id="lokasi"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="tanggal_mulai"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Tanggal mulai
                      </label>
                      <input
                        type="date"
                        disabled
                        value={moment(Data.tanggal_mulai).format("Y-MM-DD")}
                        name="tanggal_mulai"
                        id="tanggal_mulai"
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm"
                      />
                    </div>
                    <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="tanggal_selesai"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Tanggal selesai
                      </label>
                      <input
                        type="date"
                        disabled
                        value={moment(Data.tanggal_selesai).format("Y-MM-DD")}
                        name="tanggal_selesai"
                        id="tanggal_selesai"
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm"
                      />
                    </div>
                  </div>
                  <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="nomor_surat"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Nomor surat
                    </label>
                    <input
                      type="text"
                      disabled
                      value={Data.nomor_surat}
                      name="nomor_surat"
                      id="nomor_surat"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                    />
                  </div>
                  <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="tanggal_surat"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Tanggal surat
                    </label>
                    <input
                      type="date"
                      disabled
                      value={moment(Data.tanggal_surat).format("Y-MM-DD")}
                      name="tanggal_surat"
                      id="tanggal_surat"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm"
                    />
                  </div>
                  {/* <div class="relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 col-span-6">
                    <label
                      for="cover-photo"
                      class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Unggah Surat Tugas
                    </label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                        <svg
                          class="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label
                            for="file-upload"
                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Unggah berkas</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            />
                          </label>
                        </div>
                        <p class="text-xs text-gray-500">DOCX, PDF</p>
                      </div>
                    </div>
                  </div>
                   */}
                  {/* <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <label
                      htmlFor="lokasi"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Tambah Peserta
                    </label>
                    <input
                      type="text"
                      name="lokasi"
                      id="lokasi"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                    />
                  </div> */}
                  <div className="font-medium text-sm">Peserta</div>

                  <ul className="px-2 text-sm">
                    {Data.pegawai?.map((dt, dtidx) => (
                      <li className="flex">
                        <button>
                          <TrashIcon className="mr-2 text-red-500 w-4 h-4 my-auto hidden" />{" "}
                        </button>
                        <span className="my-auto">
                          {dtidx + 1}. {dt.nama_pegawai} - {dt.nip_pegawai} -{" "}
                          {dt.peran}
                        </span>{" "}
                      </li>
                    ))}
                  </ul>
                  {/* <button className="mt-5 w-full px-auto py-1 bg-indigo-600 rounded text-gray-100 text-sm">
                    Perbarui
                  </button> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout single="true">
      <div className="container">
        <div class=" bg-white rounded-md p-4 w-full mx-auto">
          <div className="animate-pulse">
            <div class="h-8 bg-gray-300 rounded w-1/4 mb-3"></div>
            <div class="h-8 bg-gray-300 rounded w-full mb-3"></div>
            <div class="h-8 bg-gray-300 rounded w-full mb-3"></div>
            <div class="h-8 bg-gray-300 rounded w-full mb-3"></div>
            <div class="h-8 bg-gray-300 rounded w-full mb-3"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
