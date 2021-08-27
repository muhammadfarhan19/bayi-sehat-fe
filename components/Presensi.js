import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { LoginIcon } from "@heroicons/react/outline";
import { request } from "./shared/fetcher/FetcherHooks";
import config from "../utils/Config";

function Presensi(props) {
  let [isOpen, setIsOpen] = useState(false);
  const [Kehadiran, setKehadiran] = useState(null);

  useEffect(() => {
    if (!Kehadiran) {
      (async () => {
        try {
          const getData = await request(
            config.apiHost + "/state-kehadiran",
            "",
            "get"
          );
          setKehadiran(getData.responseData.data);
        } catch (e) {
          // console.log(e)
        }
      })();
    }
  }, [Kehadiran]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const statuses = [
    {
      status: 1,
      deskripsi: "Belum jam masuk.",
      jam: "6.30",
    },
    {
      status: 2,
      deskripsi: "Jam masuk.",
      jam: "7.30",
    },
    {
      status: 3,
      deskripsi: "Belum jam keluar.",
      jam: "17.00",
    },
    {
      status: 4,
      deskripsi: "Jam keluar.",
      jam: "17.30",
    },
  ];

  if (Kehadiran?.status == 7) {
    return (
      <div className="text-blue-800 text-xs my-2">
        Tidak ada jadwal hari ini
      </div>
    );
  }
  if (Kehadiran?.status == 6) {
    return <div className="text-blue-800 text-xs my-2">Sudah absen keluar</div>;
  }
  if (Kehadiran?.status == 5) {
    return (
      <>
        <button
          type="button"
          onClick={openModal}
          className="text-center flex items-center mt-3 bg-red-600 text-white text-sm py-2 justify-center w-full border border-gray-200 rounded-lg hover:bg-red-700 focus:outline-none mb-1"
        >
          <LoginIcon className=" mr-2 h-4 w-4" aria-hidden="true" />
          Presensi Keluar
        </button>

        <div className="text-gray-400 text-xs">
          Batas presensi masuk pukul <strong>{Kehadiran?.jam} WIB</strong>{" "}
        </div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm inset-0 z-10 overflow-y-auto shadow-inner shadow-2xl"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                  >
                    <LoginIcon
                      className=" mr-2 h-8 w-8 rounded-full bg-red-600 text-white p-2"
                      aria-hidden="true"
                    />
                    Presensi Keluar
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Lakukan presensi keluar sekarang?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="border border-gray-200 rounded-lg mr-2 px-5 py-2 hover:bg-gray-100 focus:outline-none"
                      onClick={closeModal}
                    >
                      Batal
                    </button>
                    <button
                      className="border text-white bg-indigo-600 rounded-lg px-7 py-2 hover:bg-indigo-700 focus:outline-none"
                      onClick={closeModal}
                    >
                      Ya
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-center flex items-center mt-3 bg-green-600 text-white text-sm py-2 justify-center w-full border border-gray-200 rounded-lg hover:bg-green-700 focus:outline-none mb-1"
      >
        <LoginIcon className=" mr-2 h-4 w-4" aria-hidden="true" />
        Presensi masuk
      </button>

      <div className="text-gray-400 text-xs">
        Batas presensi masuk pukul <strong>8.00 WIB</strong>{" "}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm inset-0 z-10 overflow-y-auto shadow-inner shadow-2xl"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                >
                  <LoginIcon
                    className=" mr-2 h-8 w-8 rounded-full bg-green-600 text-white p-2"
                    aria-hidden="true"
                  />
                  Presensi masuk
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Anda akan melakukan presensi masuk untuk tanggal{" "}
                    <strong>14 Juni 2021</strong> pada jam{" "}
                    <strong>08:05 WIB</strong>?
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    className="border border-gray-200 rounded-lg mr-2 px-5 py-2 hover:bg-gray-100 focus:outline-none"
                    onClick={closeModal}
                  >
                    Batal
                  </button>
                  <button
                    className="border text-white bg-indigo-600 rounded-lg px-7 py-2 hover:bg-indigo-700 focus:outline-none"
                    onClick={closeModal}
                  >
                    Ya
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Presensi;
