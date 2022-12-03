import React from 'react';

import { RbacAPI } from '../../../constants/APIUrls';
import { GetAdminList } from '../../../types/api/RoleUserAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import Loader from '../../shared/Loader/Loader';
import Pagination from '../../shared/Pagination';
import DialogConfirmation from './DialogConfirmation';
import FormRoleUser from './FormRoleUser';

function ListRoleUser() {
  const [formModalState, setFormModalState] = React.useState<{ open: boolean; selectedId?: string }>({
    open: false,
    selectedId: undefined,
  });

  const [confirmId, setConfirmId] = React.useState(0);

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const { data: listUser, isValidating } = useCommonApi<null, GetAdminList[]>(RbacAPI.GET_RBAC_USER_ADMIN_LIST, null, {
    method: 'GET',
  });

  const totalData = () => {
    if (listUser) {
      return listUser?.length - 1;
    }
  };

  return (
    <>
      <div className="rounded-md bg-white">
        <div className="rounded-md bg-white px-6">
          <div className="flex flex-row py-6">
            <p className="text-lg text-[24px] font-medium text-gray-900">Role User</p>
            <div className="ml-auto flex">
              <div className="flex">
                <button
                  className="ml-1 inline-flex w-[220px] items-center justify-center rounded-md border border-indigo-600 bg-indigo-600 p-2 px-3 text-sm text-white hover:bg-indigo-700 focus:outline-none"
                  onClick={() => handleShowForm(!formModalState.open)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Tambah Admin Role
                </button>
              </div>
            </div>
          </div>
        </div>

        {isValidating ? (
          <div className="relative h-[150px] w-full divide-y divide-gray-200">
            <Loader />
          </div>
        ) : (
          <div className="flex">
            <div className="mb-15 overflow-x-auto sm:mx-0 ">
              <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                <table className="w-max table-auto rounded-lg bg-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="w-[5rem] px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Nama
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        NIP
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Jabatan
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(listUser || [])?.map((data, dataIdx) => (
                      <tr
                        key={data?.pegawai_id}
                        className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{dataIdx + 1}</td>
                        <td className="cursor-pointer px-6 py-4 text-xs font-medium text-indigo-800">{data?.name}</td>
                        <td className="px-6 text-xs font-medium text-gray-900">{data?.nip}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.jabatan_name}</td>
                        {(data?.roles || [])?.map(item => {
                          return (
                            <React.Fragment key={item.role_id}>
                              <td className="px-6 py-4 text-xs font-medium text-gray-900">{item.role}</td>
                              <td className="px-6 py-4 text-xs font-medium text-gray-900">
                                <button
                                  type="button"
                                  className="mr-2 rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                                  onClick={() => setConfirmId(item?.role_id)}
                                >
                                  Hapus
                                </button>
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  onChange={() => {
                    return null;
                  }}
                  totalData={listUser?.length ?? 0}
                  perPage={listUser?.length ?? 0}
                  page={totalData() ?? 0}
                />
              </div>
            </div>
          </div>
        )}
        {formModalState?.open && (
          <FormRoleUser open={formModalState?.open} setOpen={(open: boolean) => handleShowForm(open)} />
        )}
        <DialogConfirmation
          label="Yakin ingin dihapus?"
          open={!!confirmId}
          message="Anda yakin ingin menghapus data ini?"
          onClose={() => setConfirmId(0)}
          onConfirm={() => setConfirmId(0)}
          leftButtonTitle="Tidak"
          rightButtonTitle="Ya"
        />
      </div>
    </>
  );
}

export default ListRoleUser;
