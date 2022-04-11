import { ExclamationCircleIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { setModal } from '../action/CommonAction';
import { UserAPI } from '../constants/APIUrls';
import { ModalType } from '../reducer/CommonReducer';
import { PutUserPasswordReq, PutUserPasswordRes } from '../types/api/UserAPI';
import { Status } from '../types/Common';
import { callAPI } from '../utils/Fetchers';
import { CircleProgress } from './shared/CircleProgress';

export default function ChangePasswordPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<PutUserPasswordReq>();

  const submitHandler = async (formData: PutUserPasswordReq) => {
    if (formData.confirm_new_password !== formData.new_password) {
      setError('confirm_new_password', { type: 'validate' });
      return;
    }

    setLoading(true);
    const changePassRes = await callAPI<PutUserPasswordReq, PutUserPasswordRes>(UserAPI.PUT_USER_PASSWORD, formData, {
      method: 'put',
    });

    if (changePassRes.status === 200 && changePassRes.data?.status === Status.OK) {
      dispatch(
        setModal({
          message: 'Ubah kata sandi berhasil!',
          type: ModalType.INFO,
          show: true,
          redirect: '/login',
        })
      );
    } else {
      if (changePassRes.status !== 200 && changePassRes.data?.error_message) {
        const errorMessage = changePassRes.data.error_message;
        setError('confirm_new_password', { type: 'pattern', message: errorMessage });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mb-3 flex">
            <a href="#" className="mx-auto flex space-x-3">
              <img
                className="h-16 w-auto text-center"
                src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                alt="Workflow"
              />
              <span className="my-auto ml-2 font-nunito text-4xl font-semibold tracking-wide text-indigo-900">
                Intra DIKTI
              </span>
            </a>
          </div>
        </div>

        <div className="relative mx-2 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6 text-center font-semibold text-gray-600">Change Your Password</div>
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Old Password
                </label>
                <div className="mt-1">
                  <input
                    {...register('old_password', { required: true })}
                    type="password"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.old_password && errors.old_password.type === 'required' && (
                  <p className="mt-1 text-xs text-red-500">Mohon masukkan password lama anda</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    {...register('new_password', { required: true })}
                    type="password"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.new_password && errors.new_password.type === 'required' && (
                  <p className="mt-1 text-xs text-red-500">Mohon masukkan password baru anda</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <input
                    {...register('confirm_new_password', { required: true })}
                    type={'password'}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.confirm_new_password && errors.confirm_new_password.type === 'required' && (
                  <p className="mt-1 text-xs text-red-500">Mohon masukkan konfirmasi password Anda</p>
                )}
              </div>

              {errors.confirm_new_password && ['validate', 'pattern'].includes(errors.confirm_new_password.type) && (
                <div className="my-1 flex items-center space-x-1">
                  <ExclamationCircleIcon className="h-4 min-h-[1rem] w-4 min-w-[1rem] text-red-500" />
                  <div className="text-sm text-red-500">
                    {errors.confirm_new_password.message || 'Konfirmasi password salah!'}
                  </div>
                </div>
              )}

              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                >
                  {loading ? <CircleProgress /> : null}
                  Change Your Password
                </button>
              </div>
            </form>
          </div>
          {loading ? <div className="absolute inset-0" /> : null}
        </div>
      </div>
    </>
  );
}
