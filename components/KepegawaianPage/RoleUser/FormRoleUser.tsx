import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import React, { Fragment } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../../action/CommonAction';
import { KepegawaianAPI, RbacAPI } from '../../../constants/APIUrls';
import { SnackbarType } from '../../../reducer/CommonReducer';
import { GetPegawaiListData, GetPegawaiListReq } from '../../../types/api/KepegawaianAPI';
import { GetRBACRoles, PostRBACRolesReq, PostRBACRolesRes } from '../../../types/api/RoleUserAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import useCommonApi from '../../shared/hooks/useCommonApi';
import AutoComplete from '../../shared/Input/ComboBox';
import Loader from '../../shared/Loader/Loader';
import DialogConfirmation from './DialogConfirmation';
import { FormState, ModalProps } from './Shared/types';

function FormRoleUser(props: ModalProps) {
  const { open, setOpen } = props;
  const [confirmId, setConfirmId] = React.useState(0);
  const [queryPegawai, setQueryPegawai] = React.useState('');
  const debounce = React.useRef<number>(0);
  const dispatch = useDispatch();

  const { data: listRoleAdmin, isValidating } = useCommonApi<null, GetRBACRoles[]>(
    RbacAPI.GET_RBAC_USER_ADMIN_ROLES,
    null,
    { method: 'GET' }
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormState>();

  const { data: pegawaiList } = useCommonApi<GetPegawaiListReq, GetPegawaiListData>(
    KepegawaianAPI.GET_PEGAWAI_LIST,
    { page: 1, per_page: 20, status_cpns: [0], nama: queryPegawai },
    { method: 'GET' }
  );

  const submitHandler = async (formData: FormState) => {
    const resSubmit = await callAPI<PostRBACRolesReq, PostRBACRolesRes>(
      RbacAPI.POST_RBAC_SET_USER_ROLES,
      {
        user_id: Number(formData?.user_id),
        role_id: Number(formData?.role_id),
      },
      { method: 'post' }
    );

    if (resSubmit.status === 200 && resSubmit.data?.status === Status.OK) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Data berhasil tersimpan.',
          type: SnackbarType.INFO,
        })
      );
      setOpen(!open);
      setConfirmId(0);
    } else if (resSubmit.status === 401) {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Mohon maaf hak akses anda tidak bisa melakukan proses ini. Mohon hubungi superadmin.',
          type: SnackbarType.ERROR,
        })
      );
      setOpen(!open);
      setConfirmId(0);
    } else {
      dispatch(
        setSnackbar({
          show: true,
          message: 'Gagal menyimpan data. Mohon coba beberapa saat lagi.',
          type: SnackbarType.ERROR,
        })
      );
      setConfirmId(0);
      setOpen(!open);
    }
  };

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
                <form id="form-hooks" onSubmit={handleSubmit(submitHandler)} className="mt-2">
                  <div className="mt-5">
                    <div className="pt-1 sm:col-span-2 sm:mt-0">
                      <Controller
                        control={control}
                        name="user_id"
                        rules={{ required: 'Mohon Pilih Nama Pegawai' }}
                        render={({ field: { onChange } }) => (
                          <AutoComplete
                            onChange={input => {
                              onChange(input?.value);
                            }}
                            label={'Nama'}
                            defaultValue={{ text: '', value: '' }}
                            onQueryChange={queryText => {
                              if (debounce.current) {
                                clearTimeout(debounce.current);
                              }
                              debounce.current = window.setTimeout(() => {
                                setQueryPegawai(queryText);
                              }, 500);
                            }}
                            options={(pegawaiList?.list || []).map(each => ({
                              text: each.name + ' - ' + each?.unit_kerja,
                              value: String(each.user_id),
                            }))}
                          />
                        )}
                      />
                      {errors.user_id && <p className="mt-1 text-xs text-red-500">{errors.user_id.message}</p>}
                    </div>
                  </div>
                  <div className="mt-5 sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      {...register('role_id', { required: 'Silahkan Pilih Role' })}
                      name="role_id"
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
                    {errors.role_id && <p className="mt-1 text-xs text-red-500">{errors.role_id.message}</p>}
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => setConfirmId(1)}
                      className="w-full rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Tambah
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <DialogConfirmation
        form="form-hooks"
        buttonType="submit"
        label="Yakin ingin disimpan?"
        open={!!confirmId}
        message="Anda yakin ingin menyimpan data ini?"
        onClose={() => setConfirmId(0)}
        leftButtonTitle="Tidak"
        rightButtonTitle="Ya"
      />
    </>
  );
}

export default FormRoleUser;
