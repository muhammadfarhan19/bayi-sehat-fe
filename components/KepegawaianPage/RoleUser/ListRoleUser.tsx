import React from 'react';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { RbacAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { GetAdminList, PostRBACRolesReq, PostRBACRolesRes } from '../../../types/api/RoleUserAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
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
  const [confirmDelData, setConfirmDelData] = React.useState<{
    id: number;
    role_id?: number | undefined;
    user_id?: number | undefined;
  }>({
    id: 0,
    role_id: undefined,
    user_id: undefined,
  });

  const dispatch = useDispatch();

  const handleShowForm = (open: boolean, selectedId?: string) => {
    setFormModalState({
      open,
      selectedId,
    });
  };

  const {
    data: listUser,
    isValidating,
    mutate,
  } = useCommonApi<null, GetAdminList[]>(RbacAPI.GET_RBAC_USER_ADMIN_LIST, null, {
    method: 'GET',
  });

  const handleConfirm = async () => {
    const resDelete = await callAPI<PostRBACRolesReq, PostRBACRolesRes>(
      RbacAPI.POST_RBAC_REMOVE_USER_ROLES,
      {
        user_id: Number(confirmDelData?.user_id),
        role_id: Number(confirmDelData?.role_id),
      },
      { method: 'post' }
    );
    let snackbarProps;
    if (resDelete.status === 200 && resDelete.data?.status === Status.OK) {
      snackbarProps = {
        show: true,
        message: 'Data terhapus.',
        type: SnackbarType.INFO,
      };
    } else if (resDelete.status === 401) {
      snackbarProps = {
        show: true,
        message: 'Mohon maaf hak akses anda tidak bisa melakukan proses ini. Mohon hubungi superadmin.',
        type: SnackbarType.ERROR,
      };
    } else {
      snackbarProps = {
        show: true,
        message: 'Gagal menghapus data.',
        type: SnackbarType.ERROR,
      };
    }
    dispatch(setSnackbar(snackbarProps));
    setConfirmDelData({
      id: 0,
      user_id: undefined,
      role_id: undefined,
    });
    mutate();
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
                        Unit Kerja
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Role
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
                        <td className="px-6 py-4 text-xs font-medium text-indigo-800">{data?.name}</td>
                        <td className="px-6 text-xs font-medium text-gray-900">{data?.nip}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">{data?.unit_kerja_name}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-900">
                          {(data?.roles || [])?.map(item => {
                            return (
                              <React.Fragment key={item.role_id}>
                                <div className="mb-5 flex flex flex-row items-center space-x-10 text-xs font-medium text-gray-900">
                                  <p className='text-gray-900" flex w-36 text-xs font-medium'>{item.role}</p>
                                  <button
                                    type="button"
                                    className="mr-2 w-36 rounded border border-transparent bg-red-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-200 disabled:text-gray-200"
                                    onClick={() =>
                                      setConfirmDelData({
                                        id: data?.pegawai_id,
                                        user_id: data?.user_id,
                                        role_id: item?.role_id,
                                      })
                                    }
                                  >
                                    Hapus
                                  </button>
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </td>
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
                  page={1}
                />
              </div>
            </div>
          </div>
        )}
        {formModalState?.open && (
          <FormRoleUser
            onSuccess={() => mutate()}
            open={formModalState?.open}
            setOpen={(open: boolean) => handleShowForm(open)}
          />
        )}
        <DialogConfirmation
          label="Yakin ingin dihapus?"
          open={!!confirmDelData?.id}
          message="Anda yakin ingin menghapus data ini?"
          onClose={() =>
            setConfirmDelData({
              id: 0,
              user_id: undefined,
              role_id: undefined,
            })
          }
          buttonType="button"
          onConfirm={handleConfirm}
          leftButtonTitle="Tidak"
          rightButtonTitle="Ya"
        />
      </div>
    </>
  );
}

export default ListRoleUser;
