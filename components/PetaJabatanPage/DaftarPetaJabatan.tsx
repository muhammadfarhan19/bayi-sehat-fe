import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { PetaAPI } from '../../constants/APIUrls';
import { Status } from '../../types/Common';
import { GetPetaReq, GetPetaRes, PetaData, PostKebutuhanPetaReq, PostKebutuhanPetaRes } from '../../types/PetaApi';
import { callAPI } from '../../utils/Fetchers';
import Loader from '../shared/Loader/Loader';
import Pagination from '../shared/Pagination';

export default function DaftarPetaJabatan() {
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const [throwError, setThrowError] = React.useState<string>();
  const [loaded, setLoaded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selected, setSelected] = React.useState({ keterisian: 0, selisih: 0, id: 0 });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostKebutuhanPetaReq>();

  const [dataTable, setDataTable] = React.useState<PetaData>();

  const [filterState, setFilterState] = React.useState<GetPetaReq>({
    page: 1,
    per_page: 20,
  });

  React.useEffect(() => {
    refreshDataTable(filterState);
  }, []);

  const refreshDataTable = (apiReq: GetPetaReq) => {
    setLoaded(false);
    callAPI<GetPetaReq | null, GetPetaRes>(PetaAPI.GET_PETA, apiReq, {
      method: 'GET',
    }).then(res => {
      if (res.status === 200 && res.data && res.data.status === Status.OK) {
        const apiRes = res.data.data;
        if (Object.keys(apiRes).length) {
          setDataTable(apiRes);
          setLoaded(true);
        } else {
          setThrowError('Data not found');
        }
      }
    });
  };

  const changeFilterState = (inputState: Partial<GetPetaReq>) => {
    const pageAffected = Object.keys(inputState).includes('page');
    const newState = {
      ...filterState,
      ...inputState,
    };

    if (!pageAffected) {
      newState.page = 1;
    }

    setFilterState(newState);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => refreshDataTable(newState), pageAffected ? 0 : 800);
  };

  if (throwError) {
    throw throwError;
  }

  const Modal = () => {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={setOpen}>
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block" aria-hidden="true">
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
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                  <div>
                    <input
                      {...register('jabatan_id')}
                      type="hidden"
                      name="jabatan_id"
                      id="jabatan_id"
                      value={selected?.id}
                    />
                    <div className="text-left ">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Perbaharui
                      </Dialog.Title>
                      <div className="mt-2">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="keterisian" className="block text-sm font-medium text-gray-700">
                              Keterisian Pegawai (B)
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="keterisian"
                                id="keterisian"
                                value={selected?.keterisian}
                                disabled
                                className="block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="selisih" className="block text-sm font-medium text-gray-700">
                              Selisih (+/-)
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="selisih"
                                id="selisih"
                                value={selected?.selisih}
                                disabled
                                className="block w-full rounded-md border-gray-300 bg-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                          <div className="sm:col-span-3">
                            <label htmlFor="jumlah" className="block text-sm font-medium text-gray-700">
                              Kebutuhan Pegawai (K)
                            </label>
                            <div className="mt-1">
                              <input
                                {...register('jumlah', { min: 1 })}
                                type="number"
                                name="jumlah"
                                id="jumlah"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                            {errors.jumlah && (
                              <p className="mt-1 text-xs text-red-500">Mohon masukkan jumlah minimal 1</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      disabled={loading}
                    >
                      {loading ? 'Processing' : 'Simpan'}
                    </button>
                  </div>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  const submitHandler = async (formData: PostKebutuhanPetaReq) => {
    setLoading(true);
    const updateKebutuhan = {
      // unit_kerja_id: 0,
      jabatan_id: +formData.jabatan_id,
      jumlah: +formData.jumlah,
    };

    const kebutuhan = await callAPI<PostKebutuhanPetaReq, PostKebutuhanPetaRes>(
      PetaAPI.POST_JABATAN_KEBUTUHAN,
      updateKebutuhan,
      {
        method: 'put',
        withToken: true,
        checkToken: true,
      }
    );

    if (kebutuhan.status === 200 && kebutuhan.data?.status === Status.OK) {
      setLoading(false);
      setOpen(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {open && <Modal />}
      <div className="px-6">
        <div className="flex flex-row py-6">
          <p className="text-lg font-medium text-gray-900">Data Pegawai</p>
          <div className="ml-auto flex">
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari..."
              onChange={event => {
                changeFilterState({ nama_jabatan: event.target.value });
              }}
            />
          </div>
        </div>
      </div>

      {!loaded ? (
        <div className="relative h-[150px] w-full divide-y divide-gray-200">
          <Loader />
        </div>
      ) : (
        <div className="mt-[24px] overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
          <table className="w-full table-auto rounded-lg bg-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="w-10 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Kelas
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Nama Jabatan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Keterisian
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Kebutuhan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Selisih
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {(dataTable?.list || []).map((data, dataIdx) => (
                <tr
                  key={dataIdx}
                  className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                    {data.kelas_jabatan}
                  </td>
                  <td
                    className="cursor-pointer px-6 text-xs font-medium text-indigo-800"
                    onClick={() =>
                      (window.location.href = `/kepegawaian/daftar-jabatan?id=${data.id}&name=${data.jabatan}`)
                    }
                  >
                    {data.jabatan}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.keterisian}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.kebutuhan}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">{data.selisih}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-gray-900">
                    <button
                      type="button"
                      className="rounded-md bg-[#4F46E5] px-[11px] py-[7px] text-xs font-medium text-white hover:bg-indigo-700 focus:outline-none"
                      onClick={() => {
                        setOpen(true);
                        setSelected(data);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            onChange={value => {
              changeFilterState({ page: value });
            }}
            totalData={dataTable ? dataTable?.pagination.total_data : 0}
            perPage={filterState.per_page}
            page={filterState.page}
          />
        </div>
      )}
    </>
  );
}
