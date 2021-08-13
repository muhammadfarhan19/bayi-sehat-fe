import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { usePostUser, useOrganization } from '../../../../shared/fetcher/settings/FetcherSettings';
import { AlertAction } from '../../../../../action/ActionTypes';
import FetcherAlert from '../../../../shared/alert/FetcherAlert';
import FetcherLoading from '../../../../shared/loading/fetcherLoading';

export default function AddCuti() {
    const router = useRouter();
    const dispatch = useDispatch();
    const addUser = usePostUser();
    const orgList = useOrganization();
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();
    const [org, setOrg] = useState([])
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
        (async () => {
            try {
                const getOrg = await orgList();
                setOrg(getOrg.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, [])

    return (
        <>
            <FetcherAlert />

            {load ? <FetcherLoading /> : ''}


            <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                <section aria-labelledby="section-2-title">

                    <dl className="grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="px-4 sm:p-6">
                            <dt className="text-lg font-medium text-gray-900">
                                Pengajuan Cuti
                            </dt>
                        </div>

                        <div className="overflow-x-auto sm:mx-0 ">
                            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div class="w-full">
                                    <form class="py-1" onSubmit={handleSubmit(handleLogin)}>
                                        <div class="w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Unit Kerja</label>
                                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('organization_id', { required: true })} name="organization_id">
                                                    <option value="">Silahkan Pilih</option>
                                                </select>
                                                {errors.organization_id && errors.organization_id.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan pilih nama organisasi</p>}
                                            </div>
                                        </div>
                                        <div class="w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Nama Pegawai</label>
                                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('user_group_id', { required: true })} name="user_group_id">
                                                    <option value="">Silahkan Pilih</option>
                                                    <option value="47f6e07a-af04-480b-9024-aa7cab144495">Pegawai</option>
                                                    <option value="4784e593-950f-4690-a35c-058d70f1db7f">Kepala TU</option>
                                                </select>
                                                {errors.user_group_id && errors.user_group_id.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan pilih grup pengguna</p>}
                                            </div>
                                        </div>
                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nomor Telepon saat Cuti</label>
                                            <input
                                                type="text"
                                                name="c_password"
                                                {...register("c_password", {
                                                    validate: (value) => value === getValues('password')
                                                })}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {errors.c_password && <p class="mt-1 text-red-500 text-xs">Konfirmasi kata sandi tidak sesuai</p>}
                                        </div>
                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Alasan Cuti</label>
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                                defaultValue={''}
                                            />
                                            {errors.c_password && <p class="mt-1 text-red-500 text-xs">Konfirmasi kata sandi tidak sesuai</p>}
                                        </div>


                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Formulir Pengajuan Cuti</label>
                                            <p className="text-xs text-gray-500">Unggah formulir pengajuan cuti yang telah ditandatangani</p>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span>Unggah Dokumen</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                            </label>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PDF maks. 2MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Lampiran</label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                    <div className="space-y-1 text-center">
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                            aria-hidden="true"
                                                        >
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth={2}
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                        <div className="flex text-sm text-gray-600">
                                                            <label
                                                                htmlFor="file-upload"
                                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                            >
                                                                <span>Unggah Dokumen</span>
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                            </label>
                                                        </div>
                                                        <p className="text-xs text-gray-500">PDF maks. 2MB</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="w-full flex mb-4 px-6 justify-end">
                                            <button
                                                type="button"
                                                onClick={() => router.push('/kepegawaian/cuti/kelola-cuti')}
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
                    </dl>




                </section>
            </div>
        </>
    )
}