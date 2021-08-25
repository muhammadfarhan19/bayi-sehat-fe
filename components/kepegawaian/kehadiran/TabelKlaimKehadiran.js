import { Dialog, Transition } from "@headlessui/react";
import { RefreshIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon, XIcon } from "@heroicons/react/solid";
import { Fragment, useRef, useState } from "react";

function DialogKlaim({ props }) {
  return (
    <>
      <div className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi at
        fugiat fuga tempora commodi quos provident, voluptates voluptas nobis
        laudantium cumque explicabo facilis doloremque, consequuntur impedit
        pariatur atque? Blanditiis, ipsam?
      </div>
    </>
  );
}

export default function TabelKlaimKehadiran() {
  const [loadComponent, setloadComponent] = useState(false);
  const [showAdvancedFilter, setshowAdvancedFilter] = useState(false);
  const [klaimDialog1, setKlaimDialog1] = useState(false);
  const [klaimDialog2, setKlaimDialog2] = useState(false);
  const [klaimDialog3, setKlaimDialog3] = useState(false);
  let inputCatatanRef = useRef(null);

  function toggleAdvancedFilter() {
    setshowAdvancedFilter(!showAdvancedFilter);
  }

  if (loadComponent) {
    return (
      <div className="bg-white p-3 rounded-md shadow text-center ">
        <div className="animate-pulse">
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-400 rounded w-1/4"></div>
            <div class="space-y-2">
              <div class="h-10 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
        {/* <RefreshIcon height="50px" className="mx-auto text-gray-200 animate-spin"></RefreshIcon> */}
      </div>
    );
  }
  const daftar_kehadiran = [
    {
      tanggal: "3 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "1",
    },
    {
      tanggal: "2 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "2",
    },
    {
      tanggal: "1 Januari 2021",
      nip: "0001002003004005",
      nama: "Rian Ardiana Prapanca",
      unit_kerja: "Sekretariat Jenderal Pendidikan Tinggi",
      jam_masuk: "8:00",
      jam_keluar: "5:00",
      status: "3",
    },
  ];
  function kodeStatus(id_status) {
    if (id_status == 1) {
      return (
        <>
          <button
            onClick={() => setKlaimDialog1(true)}
            className="bg-blue-500 w-full rounded-md text-white px-10 py-2 focus:outline-none"
          >
            Proses
          </button>

          <Transition.Root show={klaimDialog1} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm"
              initialFocus={inputCatatanRef}
              open={klaimDialog1}
              onClose={setKlaimDialog1}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 " />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="flex">
                        <div className="text-lg leading-6 font-medium text-gray-900">
                          Klaim Kehadiran
                        </div>
                        <div className="ml-auto">
                          <button
                            onClick={() => setKlaimDialog1(false)}
                            className="bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none "
                          >
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-bold text-gray-600"
                        >
                          Lupa Absen Masuk
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <table className="table text-left">
                              <tr>
                                <td>Tanggal Absen</td>
                                <td>:</td>
                                <td>Senin, 1 Januari 2021</td>
                              </tr>
                              <tr>
                                <td>Nomor Induk Pegawai</td>
                                <td>:</td>
                                <td>0001002003004005</td>
                              </tr>
                              <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>Rian Ardiana Prapanca</td>
                              </tr>
                              <tr>
                                <td>Satuan Kerja</td>
                                <td>:</td>
                                <td>Sekretariat Jenderal Pendidikan Tinggi</td>
                              </tr>
                              <tr>
                                <td>Alasan</td>
                                <td>:</td>
                                <td>Telat bangun</td>
                              </tr>
                              <tr>
                                <td>Lampiran</td>
                                <td>:</td>
                                <td>rian.pdf</td>
                              </tr>
                            </table>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="catatan"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Catatan
                      </label>
                      <textarea
                        type="text"
                        name="catatan"
                        id="catatan"
                        ref={inputCatatanRef}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder="Beri catatan untuk klaim ini"
                      ></textarea>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                        onClick={() => setKlaimDialog1(false)}
                      >
                        Terima
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                        onClick={() => setKlaimDialog1(false)}
                      >
                        Tolak
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      );
    }
    if (id_status == 2) {
      return (
        <>
          <button
            onClick={() => setKlaimDialog2(true)}
            className=" w-full rounded-md text-green-500 px-10 py-2 focus:outline-none"
          >
            Diterima
          </button>

          <Transition.Root show={klaimDialog2} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm"
              initialFocus={inputCatatanRef}
              open={klaimDialog2}
              onClose={setKlaimDialog2}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 " />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="flex">
                        <div className="text-lg leading-6 font-medium text-gray-900">
                          Klaim Kehadiran
                        </div>
                        <div className="ml-auto">
                          <button
                            onClick={() => setKlaimDialog2(false)}
                            className="bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none "
                          >
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-bold text-gray-600"
                        >
                          Lupa Absen Masuk
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <table className="table text-left">
                              <tr>
                                <td>Tanggal Absen</td>
                                <td>:</td>
                                <td>Senin, 1 Januari 2021</td>
                              </tr>
                              <tr>
                                <td>Nomor Induk Pegawai</td>
                                <td>:</td>
                                <td>0001002003004005</td>
                              </tr>
                              <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>Rian Ardiana Prapanca</td>
                              </tr>
                              <tr>
                                <td>Satuan Kerja</td>
                                <td>:</td>
                                <td>Sekretariat Jenderal Pendidikan Tinggi</td>
                              </tr>
                              <tr>
                                <td>Alasan</td>
                                <td>:</td>
                                <td>Telat bangun</td>
                              </tr>
                              <tr>
                                <td>Lampiran</td>
                                <td>:</td>
                                <td>rian.pdf</td>
                              </tr>
                            </table>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="catatan"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Catatan
                      </label>
                      <textarea
                        disabled
                        type="text"
                        name="catatan"
                        id="catatan"
                        ref={inputCatatanRef}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder=""
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600">
                        Klaim Diterima
                      </div>
                      <div className="text-sm">oleh Lorem, ipsum dolor.</div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      );
    }
    if (id_status == 3) {
      return (
        <>
          <button
            onClick={() => setKlaimDialog3(true)}
            className=" w-full rounded-md text-red-500 px-10 py-2 focus:outline-none"
          >
            Ditolak
          </button>

          <Transition.Root show={klaimDialog3} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm"
              initialFocus={inputCatatanRef}
              open={klaimDialog3}
              onClose={setKlaimDialog3}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 " />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="flex">
                        <div className="text-lg leading-6 font-medium text-gray-900">
                          Klaim Kehadiran
                        </div>
                        <div className="ml-auto">
                          <button
                            onClick={() => setKlaimDialog3(false)}
                            className="bg-white rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none "
                          >
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-bold text-gray-600"
                        >
                          Lupa Absen Masuk
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            <table className="table text-left">
                              <tr>
                                <td>Tanggal Absen</td>
                                <td>:</td>
                                <td>Senin, 1 Januari 2021</td>
                              </tr>
                              <tr>
                                <td>Nomor Induk Pegawai</td>
                                <td>:</td>
                                <td>0001002003004005</td>
                              </tr>
                              <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>Rian Ardiana Prapanca</td>
                              </tr>
                              <tr>
                                <td>Satuan Kerja</td>
                                <td>:</td>
                                <td>Sekretariat Jenderal Pendidikan Tinggi</td>
                              </tr>
                              <tr>
                                <td>Alasan</td>
                                <td>:</td>
                                <td>Telat bangun</td>
                              </tr>
                              <tr>
                                <td>Lampiran</td>
                                <td>:</td>
                                <td>rian.pdf</td>
                              </tr>
                            </table>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                      <label
                        htmlFor="catatan"
                        className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                      >
                        Catatan
                      </label>
                      <textarea
                        disabled
                        type="text"
                        name="catatan"
                        id="catatan"
                        ref={inputCatatanRef}
                        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        placeholder=""
                      ></textarea>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-red-600">
                        Klaim Ditolak
                      </div>
                      <div className="text-sm">oleh Lorem, ipsum dolor.</div>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </>
      );
    }
  }
  return (
    <>
      <div className="bg-white rounded-md shadow">
        {/* Header */}
        <div className="flex alig-center mb-3 pt-3 px-5">
          <div className="card-title my-auto">
            Daftar Klaim Kehadiran
          </div>
          <div className="ml-auto my-auto flex">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Cari..."
            />
            <button
              className="border border-gray-300 rounded-md ml-1 p-2 focus:outline-none focus:bg-gray-50 "
              onClick={toggleAdvancedFilter}
            >
              <AdjustmentsIcon className="w-5  h-5 text-gray-400 animate-pulse "></AdjustmentsIcon>
            </button>
          </div>
        </div>
        {/* Advanced Filter */}
        {showAdvancedFilter ? (
          <div className="flex px-5 mb-3">
            <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="tanggal"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Tanggal
              </label>
              <input
                type="date"
                name="tanggal"
                id="tanggal"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="nip"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                NIP
              </label>
              <input
                type="text"
                name="nip"
                id="nip"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="nama"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Nama
              </label>
              <input
                type="text"
                name="nama"
                id="nama"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="unit_kerja"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Unit Kerja
              </label>
              <input
                type="text"
                name="unit_kerja"
                id="unit_kerja"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
            <div className="ml-2 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label
                htmlFor="unit_kerja"
                className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
              >
                Status
              </label>
              <input
                type="text"
                name="unit_kerja"
                id="unit_kerja"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Body */}

        <div className=" ">
          <div className="-my-2 overflow-x-auto sm:mx-0 ">
            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
              <div className="shadow overflow-visible border-b border-gray-200 sm:rounded-lg">
                <table className="table w-full rounded-lg bg-gray-100 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Tanggal
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        NIP
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Unit Kerja
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftar_kehadiran.map(
                      (daftar_kehadiran, daftar_kehadiranIdx) => (
                        <tr
                          key={daftar_kehadiranIdx}
                          className={
                            daftar_kehadiranIdx % 2 === 0
                              ? "bg-white hover:bg-gray-100"
                              : "bg-gray-50 hover:bg-gray-100"
                          }
                        >
                          <td className=" px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">
                            {daftar_kehadiran.tanggal}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.nip}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.nama}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {daftar_kehadiran.unit_kerja}
                          </td>
                          <td className="px-6 py-4 text-xs font-medium text-gray-900">
                            {kodeStatus(daftar_kehadiran.status)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
