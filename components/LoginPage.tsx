import { ExclamationCircleIcon, EyeIcon, EyeOffIcon, InformationCircleIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { AuthAPI } from '../constants/APIUrls';
import { HelpCenterUri } from '../constants/Resource';
import { PostAuthLoginReq, PostAuthLoginRes } from '../types/api/AuthAPI';
import { Status } from '../types/Common';
import { getCookie, setCookie } from '../utils/CookieHandler';
import { callAPI } from '../utils/Fetchers';
import { CircleProgress } from './shared/CircleProgress';

export default function LoginPage() {
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(() => {
    const rememberMeCookie = getCookie('rememberme');
    return rememberMeCookie === 1;
  });
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<PostAuthLoginReq>();

  const submitHandler = async (formData: PostAuthLoginReq) => {
    setLoading(true);

    const loginRes = await callAPI<PostAuthLoginReq, PostAuthLoginRes>(AuthAPI.POST_AUTH_LOGIN, formData, {
      withToken: false,
      checkToken: false,
    });

    if (loginRes.status === 200 && loginRes.data?.status === Status.OK) {
      const { access_token, refresh_token } = loginRes.data.data;
      setCookie('rememberme', 1);
      setCookie('token', access_token);
      setCookie('refreshtoken', refresh_token);
      setCookie('lastrefresh', Date.now());
      window.location.href = '/';
    } else {
      setError('password', { type: 'validate' });
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
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    {...register('nip', { required: true })}
                    name="nip"
                    type="text"
                    autoComplete="username"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {errors.nip && errors.nip.type === 'required' && (
                  <p className="mt-1 text-xs text-red-500">Mohon masukkan username Anda yang terdaftar di IntraDikti</p>
                )}
                <div className="my-1 flex items-center space-x-1">
                  <InformationCircleIcon className="h-4 w-4 text-gray-500" />
                  <div className="text-sm text-gray-500">Masuk dengan akun pegawai Anda</div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Kata sandi
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <input
                      {...register('password', { required: true })}
                      type={passwordShown ? 'text' : 'password'}
                      name="password"
                      autoComplete="current-password"
                      className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  {passwordShown ? (
                    <button
                      type="button"
                      onClick={() => setPasswordShown(false)}
                      className="btn relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
                    >
                      <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPasswordShown(true)}
                      className="btn relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 "
                    >
                      <EyeOffIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </button>
                  )}
                </div>
                {errors.password && errors.password.type === 'required' && (
                  <p className="mt-1 text-xs text-red-500">Mohon masukkan password Anda</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={rememberMe}
                    onChange={event => setRememberMe(event.target.checked)}
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Ingat Saya
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href={HelpCenterUri.loginGuidance}
                    target="_blank"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Panduan Login
                  </a>
                </div>
              </div>
              {errors.password && errors.password.type === 'validate' && (
                <div className="my-1 flex items-center space-x-1">
                  <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                  <div className="text-sm text-red-500">Username atau kata sandi salah!</div>
                </div>
              )}
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-200"
                >
                  {loading ? <CircleProgress /> : null}
                  Masuk
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
