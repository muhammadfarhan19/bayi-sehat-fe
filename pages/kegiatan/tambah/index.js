import Cookies from "js-cookie";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import {
  expiry,
  request,
} from "../../../components/shared/fetcher/FetcherHooks";
import config from "../../../utils/Config";
import MainLayout from "../../../components/layouts/MainLayout";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/outline";
import FetcherLoading from "../../../components/shared/loading/fetcherLoading";
import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const [DaftarPegawai, setDaftarPegawai] = useState([]);
  const [pegawai, setPegawai] = useState([]);
  const [LoadSimpan, setLoadSimpan] = useState(false);

  const [inputField, setInputField] = useState({
    cari_peserta: "",
    last_name: "",
    gmail: "",
  });

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    (async () => {
      try {
        const getData = await request(
          config.apiHost + "/data-pegawai",
          "",
          "get",
          true
        );
        setDaftarPegawai(getData.responseData.data);
        console.error(getData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const onSubmitKegiatan = async (data) => {
    const form = {};
    console.log(data);
    form.nama_kegiatan = data.nama_kegiatan;
    form.lokasi_dinas = data.lokasi_dinas;
    form.link_meeting = data.link_meeting;
    form.tanggal_mulai = data.tanggal_mulai;
    form.tanggal_selesai = data.tanggal_selesai;
    form.nomor_surat = data.nomor_surat;
    form.tanggal_surat = data.tanggal_surat;
    form.pegawai = pegawai;

    try {
      setLoadSimpan(true);
      const getData = await request(
        config.apiHost + "/dinas",
        form,
        "post",
        true
      );
      console.log(getData);
      router.push("/kegiatan");
    } catch (error) {
      console.error(error);
    }
  };

  const [ShowSuggestion, setShowSuggestion] = useState(false);
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
            className="btn text-gray-200 flex text-sm"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="ml-2 h-4 w-4 my-auto mr-4" />{" "}
          </button>
          <div className=" text-gray-100 my-auto  text-center">
            Tambah Kegiatan
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow">
          <div className="card-title">Formulir Tambah Kegiatan</div>
          <div className="text-gray-400 text-xs mb-10 md:text-sm">
            Isi formulir berikut dengan data kegiatan yang akan dilaksanakan
          </div>
          <form onSubmit={handleSubmit(onSubmitKegiatan)}>
            <div className=" grid  grid-cols-5 ">
              <div className=" col-span-5 md:col-span-5 ">
                <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="nama_kegiatan"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                  >
                    Nama kegiatan
                  </label>
                  <textarea
                    {...register("nama_kegiatan", {
                      required: true,
                    })}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm"
                  />
                  {errors.nama_kegiatan && (
                    <small className="text-red-600 text-xs">
                      Nama kegiatan harus diisi
                    </small>
                  )}
                </div>
                <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="lokasi"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                  >
                    Lokasi
                  </label>
                  <input
                    {...register("lokasi_dinas", {
                      required: true,
                    })}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none text-sm"
                  />
                  {errors.lokasi_dinas && (
                    <small className="text-red-600 text-xs">
                      Lokasi dinas harus diisi
                    </small>
                  )}
                </div>
                <div className=" relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="lokasi"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                  >
                    Link meeting (opsional)
                  </label>
                  <input
                    {...register("link_meeting")}
                    id="lokasi"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none text-sm"
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
                      {...register("tanggal_mulai", {
                        required: true,
                      })}
                      id="tanggal_mulai"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm focus:outline-none"
                    />
                    {errors.tanggal_mulai && (
                      <small className="text-red-600 text-xs">
                        Tanggal mulai harus diisi
                      </small>
                    )}
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
                      {...register("tanggal_selesai", {
                        required: true,
                      })}
                      id="tanggal_selesai"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm focus:outline-none"
                    />
                    {errors.tanggal_selesai && (
                      <small className="text-red-600 text-xs">
                        Tanggal selesai harus diisi
                      </small>
                    )}
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
                    {...register("nomor_surat", {
                      required: true,
                    })}
                    id="nomor_surat"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-sm focus:outline-none"
                  />
                  {errors.nomor_surat && (
                    <small className="text-red-600 text-xs">
                      Nomor surat harus diisi
                    </small>
                  )}
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
                    {...register("tanggal_surat", {
                      required: true,
                    })}
                    id="tanggal_surat"
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm"
                  />
                  {errors.tanggal_surat && (
                    <small className="text-red-600 text-xs">
                      Tanggal surat harus diisi
                    </small>
                  )}
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
                      <p class="text-xs text-gray-500">
                        DOCX, PDF
                      </p>
                    </div>
                  </div>
                </div>
                */}

                <div className=" relative  md:mb-6 flex-grow border border-gray-300 rounded-md px-3 py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                  <label
                    htmlFor="lokasi"
                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                  >
                    Tambah peserta
                  </label>
                  <input
                    type="text"
                    onFocus={() => setShowSuggestion(true)}
                    name="cari_peserta"
                    onChange={inputsHandler}
                    value={inputField.cari_peserta}
                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 text-xs text-sm"
                  />
                </div>
                {ShowSuggestion && (
                  <div className="relative mb-3 md:mb-6 flex-grow border border-gray-300 rounded-md  py-2 shadow-xs focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                    <ul className="">
                      {DaftarPegawai.filter(
                        (dt) =>
                          dt.nama
                            .toLowerCase()
                            .indexOf(inputField.cari_peserta.toLowerCase()) >
                            -1 ||
                          dt.nip
                            .toLowerCase()
                            .indexOf(inputField.cari_peserta.toLowerCase()) > -1
                      ).map((dt) => (
                        <li
                          className="cursor-pointer px-2 text-sm hover:bg-indigo-50 py-1 rounded"
                          onClick={() => {
                            setPegawai((prevState) => [...prevState, dt.id]),
                              setShowSuggestion(false);
                          }}
                        >
                          {dt.nip} - {dt.nama}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="font-medium text-sm">Peserta</div>
                <ul className="px-2 text-sm">
                  {pegawai &&
                    pegawai.map((dt, dtIdx) => {
                      return (
                        <li className="flex" key={dtIdx}>
                          <button
                            onClick={() =>
                              setPegawai((prevState) =>
                                prevState.filter((pg) => pg !== dt)
                              )
                            }
                            type="button"
                            className="outline-none"
                          >
                            <TrashIcon className="ml-4 text-red-500 w-4 h-4 my-auto" />{" "}
                          </button>
                          <span className="my-auto">
                            {dtIdx + 1}.{" "}
                            {DaftarPegawai.find((dp) => dp.id == dt).nama} -
                            {DaftarPegawai.find((dp) => dp.id == dt).nip}
                          </span>{" "}
                        </li>
                      );
                    })}
                </ul>

                <button
                  className="mt-5 w-full px-auto py-2 bg-indigo-600 rounded text-gray-100 text-sm"
                  type="submit"
                  disabled={LoadSimpan}
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
