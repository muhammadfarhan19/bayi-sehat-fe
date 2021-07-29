import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { usePostUser, useOrganization } from '../../shared/fetcher/settings/FetcherSettings';
import { AlertAction } from '../../../action/ActionTypes';
import FetcherAlert from '../../shared/alert/FetcherAlert';
import FetcherLoading from '../../shared/loading/fetcherLoading';

export default function AddTunjangan() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();
    const [load, setLoad] = useState(false);
    const [bulan, setBulan] = useState([]);

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
        setBulan([])
        getMonth()
    }, [])

    const getMonth = () => {
        const list = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        for (let i = 0; i < 12; i++) {
            setBulan(state => [...state, list[i]])
        }
    }

    return (
        <>
            <FetcherAlert />

            {load ? <FetcherLoading /> : ''}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-2-title">
                    <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">

                        <div className="grid md:grid-cols-3 px-4 sm:p-6 gap-4">
                            <div className="w-full col-span-2 self-center flex">
                                <dt className="text-lg font-medium text-gray-900">
                                    Tambah Transaksi
                                </dt>
                            </div>
                        </div>

                        <div className="overflow-x-auto sm:mx-0 ">
                            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div class="w-full">
                                    <form class="pb-5" onSubmit={handleSubmit(handleLogin)}>
                                        <div class="w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Bulan</label>
                                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                    {bulan.map((data, i) => (
                                                        <>
                                                            <option value={data} selected={i === new Date().getMonth()}>{data} 2021</option>
                                                        </>
                                                    ))}
                                                </select>
                                                {errors.username && errors.username.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan masukan username</p>}
                                            </div>
                                        </div>
                                        <div class="w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label class="block text-gray-700 text-sm font-bold mb-2"> Kode Transaksi</label>
                                                <input
                                                    type="text"
                                                    name="text"
                                                    {...register('text', { required: true })}
                                                    defaultValue={'AHHAASHIAP'}
                                                    readOnly
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
                                                />
                                                {errors.text && errors.text.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan masukan kode transaksi</p>}
                                            </div>
                                        </div>
                                        <div class="w-full flex mb-4 px-6 justify-between">
                                            <button
                                                type="button"
                                                onClick={() => router.push('/kepegawaian/tunjangan-kinerja')}
                                                className="flex mr-2 justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Batal
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