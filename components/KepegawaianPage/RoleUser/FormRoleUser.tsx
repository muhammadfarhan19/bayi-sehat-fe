import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';

import { MasterAPI, RbacAPI } from '../../../constants/APIUrls';
import { JenisJabatanListData } from '../../../types/api/MasterAPI';
import { GetRBACRoles } from '../../../types/api/RoleUserAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import { InputLabelled } from '../DataKepegawaian/DetailPegawai/RiwayatKeluarga/Shared/KeluargaComponents';
import DialogConfirmation from './DialogConfirmation';
import { ModalProps } from './Shared/types';

function FormRoleUser(props: ModalProps) {
  const { open, setOpen } = props;
  const [confirmId, setConfirmId] = React.useState(0);

  const { data: listRoleAdmin, isValidating } = useCommonApi<null, GetRBACRoles[]>(
    RbacAPI.GET_RBAC_USER_ADMIN_ROLES,
    null,
    { method: 'GET' }
  );

  const { data: jabatanList } = useCommonApi<null, JenisJabatanListData[]>(MasterAPI.GET_JENIS_JABATAN_LIST, null, {
    method: 'GET',
  });

  const toggleModal = () => {
    setOpen(!open);
  };

  if (isValidating) {
    return (
      <div className="relative h-[150px] w-full divide-y divide-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={toggleModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-brightness-50" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-lg transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="flex justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Tambah Admin Role</h3>
                  <XIcon className="h-5 cursor-pointer" onClick={toggleModal} />
                </Dialog.Title>
                {/* <form className="mt-2"> */}
                <InputLabelled
                  label="Nama"
                  type="text"
                  name="nama"
                  errorMessage={null}
                  isError={null}
                  validation={null}
                />
                <InputLabelled
                  label="NIP"
                  type="text"
                  name="nip"
                  errorMessage={null}
                  isError={null}
                  validation={null}
                />
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                  <select
                    name="tahun"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {(jabatanList || []).map((item, index) => (
                      <option key={index} value={item?.id}>
                        {item?.jenis_jabatan}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-5 sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="tahun"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {(listRoleAdmin || []).map(item => {
                      return (
                        <Fragment key={item?.role_id}>
                          <option value={item?.role_id}>{item?.role}</option>
                        </Fragment>
                      );
                    })}
                  </select>
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => setConfirmId(1)}
                    className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Tambah
                  </button>
                </div>
                {/* </form> */}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <DialogConfirmation
        label="Yakin ingin disimpan?"
        open={!!confirmId}
        message="Anda yakin ingin menyimpan data ini?"
        onClose={() => setConfirmId(0)}
        onConfirm={() => setConfirmId(0)}
        leftButtonTitle="Tidak"
        rightButtonTitle="Ya"
      />
    </>
  );
}

export default FormRoleUser;
