import { useEffect, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { useForm } from 'react-hook-form'
import { request } from '../../../shared/fetcher/FetcherHooks'
import config from '../../../../utils/Config'

export default function Modal({ close, tipe, data, result }) {
  const [open, setOpen] = useState(true)
  const [cancel, setCancel] = useState(false)
  const cancelButtonRef = useRef(null)
  const router = useRouter()
  const { handleSubmit, reset, register, formState: { errors } } = useForm();
  const [status, setStatus] = useState('')
  const [err, setErr] = useState(false)

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

  const handleStatus = (data) => {
    setStatus(data)
  }

  const handlePost = async (handleSubmit) => {
    // setLoad(true)

    if (status !== '') {
      let submit = {
        ...handleSubmit,
        status
      };
      try {
        const post = await request(config.apiHost + '/buku-tamu-status/' + data.id, submit, 'put', true);
        // setLoad(false)
        if (post.responseData.status === 'SUCCESS') {
          close(false)
          setOpen(false)
          setStatus('')
          result(true)
          router.push('/kunjungan/buku-tamu')
        } else {
          dispatch({
            type: AlertAction.SET_OPEN,
            open: true,
            title: 'Terjadi Kesalahan',
            subtitle: 'Silahkan coba beberapa saat lagi',
            status: 'error'
          });
        }
      } catch (e) {
        // setLoad(false)
      }
    } else {
      setErr(true)
    }
  }

  useEffect(() => {
    reset({
      nomor_kartu: data?.nomor_kartu,
      nik: data?.nik,
    })
  }, [reset])

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
        <form onSubmit={handleSubmit(handlePost)}>
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
                      Ubah Status Kunjungan
                    </Dialog.Title>
                  </div>
                </div>

                <div className="mt-7">
                  <div className="grid grid-cols-4 gap-4 px-4">

                    {tipe === 'MENUNGGU' &&
                      <div>
                        <button
                          type="button"
                          onClick={() => { handleStatus('MENUNGGU') }}
                          className="w-full text-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Menunggu
                        </button>
                      </div>
                    }

                    <div>
                      <button
                        type="button"
                        onClick={() => { handleStatus('MASUK') }}
                        className="w-full text-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Masuk
                      </button>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => { handleStatus('PULANG') }}
                        className="w-full text-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Pulang
                      </button>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => { handleStatus('BATAL') }}
                        className="w-full text-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                  <div className="grid-cols-1 mt-2 px-4">
                    {err && <p className="mt-1 text-red-500 text-xs">Silahkan pilih status</p>}
                  </div>
                </div>

                <div class="w-full flex mt-6 gap-4 px-4">
                  <div class="w-1/2">
                    <label class="block text-gray-700 text-sm mb-2"> Nomor Kartu</label>
                    <input
                      type="text"
                      name="nomor_kartu"
                      readOnly={tipe !== 'MENUNGGU'}
                      {...register('nomor_kartu', { required: true })}
                      className={tipe === 'MENUNGGU' ? ("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") : ("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm placeholder-gray-400 bg-gray-100 focus:ring-transparent cursor-not-allowed")}
                    />
                    {errors.nomor_kartu && <p className="mt-1 text-red-500 text-xs">Nomor Kartu tidak boleh kosong</p>}
                  </div>
                  <div class="w-1/2">
                    <label class="block text-gray-700 text-sm mb-2" for="username">NIK</label>
                    <input
                      type="text"
                      name="nik"
                      readOnly={tipe !== 'MENUNGGU'}
                      {...register('nik', { required: true })}
                      className={tipe === 'MENUNGGU' ? ("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm") : ("appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm placeholder-gray-400 bg-gray-100 focus:ring-transparent cursor-not-allowed")}
                    />
                    {errors.nik && <p className="mt-1 text-red-500 text-xs">NIK tidak boleh kosong</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-10 px-4 float-right">
                  <div>
                    <button
                      type="button"
                      className="inline-flex mr-2 text-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center px-2 py-2 focus:outline-none rounded-md bg-indigo-600 text-sm leading-4 font-medium border border-indigo-600 text-white hover:bg-indigo-700">
                      Simpan
                    </button>
                  </div>
                </div>

              </div>

            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>

  )
}