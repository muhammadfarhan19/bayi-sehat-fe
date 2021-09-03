import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { usePostUser, useOrganization } from '../../../../shared/fetcher/settings/FetcherSettings';
import { AlertAction } from '../../../../../action/ActionTypes';
import FetcherAlert from '../../../../shared/alert/FetcherAlert';
import FetcherLoading from '../../../../shared/loading/fetcherLoading';
import { request } from '../../../../shared/fetcher/FetcherHooks';
import config from '../../../../../utils/Config';
import moment from 'moment';

export default function AddCuti() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleSubmit, getValues, register, formState: { errors } } = useForm();
    const [load, setLoad] = useState(false);
    const [user, setUser] = useState([])
    const [jenis, setJenis] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const getData = await request(config.apiHost + '/auth/getUser', '', 'get', true);
                const getJenis = await request(config.apiHost + '/cuti/jenis', '', 'get', true);
                setUser(getData.responseData.data)
                setJenis(getJenis.responseData.data)
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    const handleCuti = async (handleSubmit) => {
        setLoad(true)
        try {
            const post = await request(config.apiHost + '/cuti/post/' + user?.id, handleSubmit, 'post', false);
            console.log(post)
            // setLoad(false)
            // if (login.responseData.status === 'SUCCESS') {

            // } else {
            //     if (login.responseData.status === 'UNAUTHORIZED') {
            //         dispatch({
            //             type: AlertAction.SET_OPEN,
            //             open: true,
            //             title: 'Pengguna tidak di temukan',
            //             subtitle: 'Password yang anda masukan salah, silahkan coba lagi',
            //             status: 'error'
            //         });
            //     } else if (login.responseData.status === 'NOT_FOUND') {
            //         dispatch({
            //             type: AlertAction.SET_OPEN,
            //             open: true,
            //             title: 'Pengguna tidak di temukan',
            //             subtitle: 'Username yang anda masukan salah, silahkan coba lagi',
            //             status: 'error'
            //         });
            //     } else {
            //         dispatch({
            //             type: AlertAction.SET_OPEN,
            //             open: true,
            //             title: 'Terjadi Kesalahan',
            //             subtitle: 'Silahkan coba beberapa saat lagi',
            //             status: 'error'
            //         });
            //     }
            // }
        } catch (e) {
            setLoad(false)
        }
    }

    return (
        <>
            <FetcherAlert />

            {load ? <FetcherLoading /> : ''}


            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <section aria-labelledby="section-2-title">

                    <dl className="grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                        <div className="px-4 sm:p-6">
                            <dt className="text-lg font-medium text-gray-900">
                                Pengajuan Cuti
                            </dt>
                            <dt className="mt-2 text-sm font-small text-gray-700">
                                Isi data di bawah ini dengan teliti dan benar
                            </dt>
                        </div>

                        <div className="overflow-x-auto sm:mx-0 ">
                            <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div class="w-full">
                                    <form class="py-1" onSubmit={handleSubmit(handleCuti)}>
                                        <input type="hidden" {...register('users_id')} name="users_id" value={user?.id} />
                                        <div class="w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Nama</label>
                                                <input
                                                    type="text"
                                                    name="c_password"
                                                    readOnly
                                                    value={user?.nama}
                                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm placeholder-gray-400 sm:text-sm focus:ring-transparent cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        {/* tanggal  */}
                                        <div class="grid-col-2 w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Tanggal Cuti (Mulai)</label>
                                                <input type="date" placeholder="Date" min={moment().subtract(1, 'month').format('YYYY-MM-05')} max={moment().add(1, 'month').format('YYYY-MM-05')} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("tgl_mulai", {
                                                        validate: (value) => value < getValues('tgl_selesai')
                                                    })} 
                                                    name="tgl_mulai"
                                                />
                                                {errors.tgl_mulai && <p class="mt-1 text-red-500 text-xs">Tanggal mulai tidak boleh lebih besar dari tanggal selesai</p>}
                                            </div>
                                            <div class="w-full px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Tanggal Cuti (Selesai)</label>
                                                <input type="date" min={moment().subtract(1, 'month').format('YYYY-MM-05')} max={moment().add(1, 'month').format('YYYY-MM-05')} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    {...register("tgl_selesai", {
                                                        validate: (value) => value > getValues('tgl_mulai')
                                                    })}
                                                    name="tgl_selesai"
                                                />
                                                {errors.tgl_selesai && <p class="mt-1 text-red-500 text-xs">Tanggal selesai tidak boleh lebih kecil dari tanggal mulai</p>}
                                            </div>
                                        </div>

                                        <div class="w-full flex mb-4">
                                            <div class="w-full px-6">
                                                <label className="block text-gray-700 text-sm font-bold mb-2"> Jenis Cuti</label>
                                                <select className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" {...register('jenis_cuti', { required: true })} name="jenis_cuti">
                                                    <option value="">Silahkan Pilih</option>
                                                    {jenis.map((data) => (
                                                        <option value={data.id}> {data.nama_cuti}</option>
                                                    ))}
                                                </select>
                                                {errors.jenis_cuti && errors.jenis_cuti.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan pilih jenis cuti</p>}
                                            </div>
                                        </div>
                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Alasan Cuti</label>
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                                defaultValue={''}
                                                {...register('alasan', { required: true })} name="alasan"
                                            />
                                            {errors.alasan && <p class="mt-1 text-red-500 text-xs">Silahkan masukan alasan cuti</p>}
                                        </div>
                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Nomor Telepon saat Cuti</label>
                                            <input
                                                type="number"
                                                name="no_telp"
                                                {...register('no_telp', { required: true })} name="no_telp"
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                            {errors.no_telp && errors.no_telp.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan masukan nomor telepon</p>}
                                        </div>
                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Alamat saat cuti</label>
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                                                defaultValue={''}
                                                {...register('alamat', { required: true })} name="alamat"
                                            />
                                            {errors.alamat && errors.alamat.type === "required" && <p class="mt-1 text-red-500 text-xs">Silahkan masukan alamat saat cuti</p>}
                                        </div>

                                        <div class="full px-6 mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Formulir Pengajuan Cuti *</label>
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
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" {...register('formulir')} name="formulir" />
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
                                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" {...register('lampiran')} name="lampiran" />
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
                                                onClick={() => router.push('/profil/kepegawaian/cuti')}
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