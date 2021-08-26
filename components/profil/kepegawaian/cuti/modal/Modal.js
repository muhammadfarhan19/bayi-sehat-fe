import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export default function Modal({ close, tipe }) {
  const [open, setOpen] = useState(true)
  const [cancel, setCancel] = useState(false)
  const cancelButtonRef = useRef(null)
  const router = useRouter()

  const submit = () => {
    close(false)
    setOpen(false)
    router.push('/kepegawaian/tunjangan-kinerja/tambah')
  }

  const handleCancel = () => {
    if (cancel) {
      setCancel(false)
    } else {
      setCancel(true)
    }
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed bg-gray-900 bg-opacity-30 backdrop-filter backdrop-blur-sm inset-0 z-10 overflow-y-auto shadow-inner shadow-2xl"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={() => { setOpen(false), close(false) }}
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
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
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

              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => { setOpen(false), close(false) }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Pengajuan Cuti
                  </Dialog.Title>
                </div>
              </div>

              <div className="mt-7">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-right text-lg text-gray-900 font-bold">
                      Cuti Sakit
                    </p>
                  </div>
                  <div>
                    {tipe === 0 ?
                      <div className="w-20 bg-indigo-100 py-1 rounded-md">
                        <label className="block text-indigo-800 text-sm text-center cursor-pointer"> Diproses</label>
                      </div>
                      : tipe === 1 ?
                        <div className="w-20 bg-green-100 py-1 rounded-md">
                          <label className="block text-green-800 text-sm text-center cursor-pointer"> Diterima</label>
                        </div>
                        : tipe === -1 ?
                          <div className="w-20 bg-red-100 py-1 rounded-md cursor-pointer">
                            <label className="block text-red-800 text-sm text-center cursor-pointer"> Ditolak</label>
                          </div>
                          : <div className="w-20 bg-yellow-100 py-1 rounded-md">
                            <label className="block text-yellow-800 text-sm text-center cursor-pointer"> Dibatalkan</label>
                          </div>
                    }
                  </div>
                </div>


              </div>

              <div className="mt-3 text-center sm:mt-5 sm:mx-4 sm:text-left">
                <table class="w-full table-auto">
                  <tr>
                    <td className="py-2 text-sm text-gray-500">Tanggal</td>
                    <td className="px-2 py-2 text-sm text-gray-500">:</td>
                    <td className="py-2 text-sm text-gray-500">10/06/2021 - 13/06/2021</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-500">Alasan</td>
                    <td className="px-2 py-2 text-sm text-gray-500">:</td>
                    <td className="py-2 text-sm text-gray-500">Sakit dan perlu istirahat di rumah</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-500">Formulir Pengajuan</td>
                    <td className="px-2 py-2 text-sm text-gray-500">:</td>
                    <td className="py-2 text-sm text-indigo-500">berkas-pengajuan.pdf</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-500">Lampiran</td>
                    <td className="px-2 py-2 text-sm text-gray-500">:</td>
                    <td className="py-2 text-sm text-indigo-500">lampiran.pdf</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-sm text-gray-500">Catatan</td>
                    <td className="px-2 py-2 text-sm text-gray-500">:</td>
                    <td className="py-2 text-sm text-gray-500">{tipe === 0 ? '-' : 'Semoga lekas sembuh'}</td>
                  </tr>
                </table>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5 sm:mt-4 px-5">
                {tipe === 0 || tipe === 1 ? (
                  <>
                    <div className="grid col-span-2 mt-5 sm:mt-4">
                      <p className="text-sm text-gray-500 text-left underline" style={{ cursor: 'pointer' }} onClick={handleCancel}>Batalkan Pengajuan?</p>
                    </div>
                  </>
                ) : ('')}
              </div>

              <div className="px-5 grid grid-col-1">
                {cancel ? (
                  <table>
                    <tr>
                      <td className="py-2 text-sm text-gray-500">Catatan</td>
                    </tr>
                    <tr>
                      <td>
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                          defaultValue={''}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-5">
                        <button
                          type="button"
                          className="mt-6 inline-flex justify-center rounded-md rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-full sm:text-sm"
                          onClick={() => { setOpen(false), close(false) }}
                        >
                          Ajukan Pembatalan Cuti
                        </button>
                      </td>
                    </tr>
                  </table>
                ) : (
                  ''
                )}
              </div>

            </div>

          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}