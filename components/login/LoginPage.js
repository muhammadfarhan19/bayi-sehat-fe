import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import FetcherAlert from '../shared/alert/FetcherAlert';
import FetcherLoading from '../shared/loading/fetcherLoading';
import { request, useLogin } from '../shared/fetcher/FetcherHooks';
import { AlertAction } from '../../action/ActionTypes';
import Cookies from 'js-cookie'
import Head from 'next/head';
import React, { useState } from 'react';
import config from '../../utils/Config'

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [load, setLoad] = useState(false)

    const { handleSubmit, register, formState: { errors } } = useForm();

    const handleLogin = async (handleSubmit) => {
        setLoad(true)
        try {
            const login = await request(config.apiHost + '/auth/login', handleSubmit, 'post', false);
            setLoad(false)
            if (login.responseData.status === 'SUCCESS') {
                const exp = new Date(new Date().getTime() + 5 * 60 * 1000);
                Cookies.set('token', login.responseData.data.access_token, { expires: exp });
                Cookies.set('refreshtoken', login.responseData.data.refresh_token, { expires: exp });
                router.push("/");
            }else{
                if (login.responseData.status === 'UNAUTHORIZED') {
                    dispatch({
                        type: AlertAction.SET_OPEN,
                        open: true,
                        title: 'Pengguna tidak di temukan',
                        subtitle: 'Password yang anda masukan salah, silahkan coba lagi',
                        status: 'error'
                    });
                } else if (login.responseData.status === 'NOT_FOUND') {
                    dispatch({
                        type: AlertAction.SET_OPEN,
                        open: true,
                        title: 'Pengguna tidak di temukan',
                        subtitle: 'Username yang anda masukan salah, silahkan coba lagi',
                        status: 'error'
                    });
                } else {
                    dispatch({
                        type: AlertAction.SET_OPEN,
                        open: true,
                        title: 'Terjadi Kesalahan',
                        subtitle: 'Silahkan coba beberapa saat lagi',
                        status: 'error'
                    });
                }
            }
        } catch (e) {
            setLoad(false)
        }
    }

    return (
        <>
            <Head>
                <title>Intra DIKTI</title>
            </Head>
            
            <FetcherAlert />
            
            {load ? <FetcherLoading /> : ''}

            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <div className="flex mb-3">
                        <a href="#" className="flex mx-auto">
                            <img
                                className="h-16 w-auto text-center"
                                src="https://dikti.kemdikbud.go.id/wp-content/uploads/2020/03/cropped-logo-dikbud.png"
                                alt="Workflow"
                            />
                            <span className="text-indigo-600 my-auto ml-2 font-nunito text-4xl tracking-wide font-semibold">
                                Intra DIKTI
                            </span>
                        </a>
                    </div>
                    <h2 className="text-center text-gray-900">
                        Masuk Intra DIKTI dengan akun pegawai anda
                    </h2>
                </div>

                <div className="mt-8 mx-2 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        {...register('username', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.username && errors.username.type === "required" && <p class="mt-1 text-red-500 text-xs">Mohon masukkan username Anda yang terdaftar di IntraDikti</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Kata Sandi
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        {...register('password', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.password && errors.password.type === "required" && <p class="mt-1 text-red-500 text-xs">Mohon masukkan kata sandi Anda yang terdaftar di IntraDikti</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                        Tetap masuk
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Lupa kata sandi?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                                    Masuk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}