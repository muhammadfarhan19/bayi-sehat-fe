import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { usePostUser, useOrganization, useDetailUser } from '../../shared/fetcher/settings/FetcherSettings';
import { AlertAction } from '../../../action/ActionTypes';
import FetcherAlert from '../../shared/alert/FetcherAlert';
import FetcherLoading from '../../shared/loading/fetcherLoading';

export default function AddUser() {
    const router = useRouter();
    const dispatch = useDispatch();
    const addUser = usePostUser();
    const userDetail = useDetailUser();
    const orgList = useOrganization();

    const { handleSubmit, register, getValues, formState: { errors } } = useForm();
    const [org, setOrg] = useState([])
    const [detail, setDetail] = useState([])
    const [load, setLoad] = useState(false);

    const handleLogin = async (handleSubmit) => {
        setLoad(true)
        try {
            const post = await addUser(handleSubmit);
            setLoad(false)
            if (post.status === 'SUCCESS') {
                dispatch({
                    type: AlertAction.SET_OPEN,
                    open: true,
                    title: 'Data Berhasil Di Simpan',
                    subtitle: '',
                    status: 'success',
                    redirect: '/admin/manajemen-user'
                });
            }
        } catch (e) {
            setLoad(false)
            if (e.status === 'FAILED') {
                dispatch({
                    type: AlertAction.SET_OPEN,
                    open: true,
                    title: 'Pengguna sudah terdaftar',
                    subtitle: 'Pengguna yang anda masukan telah terdaftar, silahkan coba lagi',
                    status: 'error',
                });
            }
        }
    }

    useEffect(() => {
        if (router.query.id) {
            (async () => {
                try {
                    const [getDetail, getOrg] = await Promise.all([
                        userDetail(router.query.id),
                        orgList()
                    ])
                    setDetail(getDetail.data)
                    setOrg(getOrg.data)
                } catch (e) {
                    console.log(e)
                }
            })();
        }
    }, [router])

    return (
        <>
            <FetcherAlert />

            {load ? <FetcherLoading /> : ''}
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <section aria-labelledby="section-2-title">
                    <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                        <div className="overflow-x-auto sm:mx-0 ">
                            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div class="w-full">
                                    <form class="py-5" onSubmit={handleSubmit(handleLogin)}>
                                        <div class="w-full flex mb-4">
                                            <div class="w-1/2 px-6">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username</label>
                                                <input
                                                    type="text"
                                                    name="username"
                                                    {...register("username", {
                                                        validate: (value) => value === ''
                                                    })}
                                                    defaultValue={detail.username}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {errors.username && <p class="mt-1 text-red-500 text-xs">Silahkan masukan username</p>}
                                            </div>
                                            <div class="w-1/2 px-6">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    defaultValue={detail.email}
                                                    {...register('email', { required: true })}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {errors.email && errors.email.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan masukan email</p>}
                                            </div>
                                        </div>
                                        <div class="w-full flex mb-4">
                                            <div class="w-1/2 px-6">
                                                <label class="block text-gray-700 text-sm font-bold mb-2"> Kata Sandi Baru</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    {...register('password', { required: true })}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {errors.password && errors.password.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan masukan kata sandi</p>}
                                            </div>
                                            <div class="w-1/2 px-6">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Konfirmasi Kata Sandi Baru</label>
                                                <input
                                                    type="password"
                                                    name="c_password"
                                                    {...register("c_password", {
                                                        validate: (value) => value === getValues('password')
                                                    })}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                                {errors.c_password && <p class="mt-1 text-red-500 text-xs">Konfirmasi kata sandi tidak sesuai</p>}
                                            </div>
                                        </div>
                                        <div class="w-full flex mb-4">
                                            <div class="w-1/2 px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Nama Organisasi</label>
                                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('organization_id', { required: true })} name="organization_id" defaultValue={detail.organization_id}>
                                                    <option value="">Silahkan Pilih</option>
                                                    {org.map((data) => (
                                                        <option value={'' + data.id}>{data.organization_name}</option>
                                                    ))}
                                                </select>
                                                {errors.organization_id && errors.organization_id.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan pilih nama organisasi</p>}
                                            </div>
                                            <div class="w-1/2 px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Grup Pengguna</label>
                                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('user_group_id', { required: true })} name="user_group_id" value={detail.organization_id}>
                                                    <option value="">Silahkan Pilih</option>
                                                    <option value="47f6e07a-af04-480b-9024-aa7cab144495">Pegawai</option>
                                                    <option value="4784e593-950f-4690-a35c-058d70f1db7f">Kepala TU</option>
                                                </select>
                                                {errors.user_group_id && errors.user_group_id.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan pilih grup pengguna</p>}
                                            </div>
                                        </div>
                                        <div class="w-full flex mb-4 px-6">
                                            <button
                                                type="button"
                                                onClick={() => router.push('/admin/manajemen-user')}
                                                className="flex mr-2 justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Kembali
                                        </button>
                                            <button
                                                type="submit"
                                                className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Simpan
                                        </button>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}