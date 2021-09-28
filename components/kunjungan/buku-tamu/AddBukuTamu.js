import * as React from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { request } from '../../shared/fetcher/FetcherHooks';
import config from '../../../utils/Config';
import FetcherLoading from '../../shared/loading/fetcherLoading';
import FetcherAlert from '../../shared/alert/FetcherAlert';
import { useDispatch } from 'react-redux';
import { AlertAction } from '../../../action/ActionTypes';

export default function AddBukuTamu() {
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const [load, setLoad] = React.useState(false);
    const dispatch = useDispatch();

    const handleCuti = async (handleSubmit) => {
        setLoad(true)
        try {
            const post = await request(config.apiHost + '/buku-tamu/post', handleSubmit, 'post', true);
            console.log(post.responseData.status)
            setLoad(false)
            if (post.responseData.status === 'SUCCESS') {
                router.push('/kunjungan/buku-tamu')
            } else {
                dispatch({
                    type: AlertAction.SET_OPEN,
                    open: true,
                    title: 'Terjadi Kesalahan',
                    subtitle: 'Silahkan coba beberapa saat lagi',
                    status: 'error'
                });
            }
        } catch (e) {
            setLoad(false)
        }
    }

    return (
        <>

            <FetcherAlert />
            {load ? <FetcherLoading /> : ''}
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <div className="bg-white rounded-md shadow">
                    <div className="grid md:grid-cols-3 px-4 sm:p-6 gap-4">
                        <div className="w-full col-span-2 self-center flex cursor-pointer" onClick={() => { router.push('/kunjungan/buku-tamu') }}>
                            <dt className="text-md font-sm text-gray-600 flex self-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 float-left flex self-center" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Kembali
                            </dt>
                        </div>
                    </div>


                    <div className="flex align-center mb-3 pt-3 px-6 pt-2">
                        <div className="text-xl font-medium text-gray-900 my-auto">
                            Tambah Data Tamu
                        </div>
                    </div>

                    <div className="w-full px-6">
                        <form className="py-1" onSubmit={handleSubmit(handleCuti)}>
                            {/* <input type="hidden" {...register('users_id')} name="users_id" value={user?.id} /> */}
                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Kartu</label>
                                    <input
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('nomor_kartu', { required: true })}
                                        name="nomor_kartu"
                                    />
                                    {errors.nomor_kartu && errors.nomor_kartu.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nomor kartu</p>}
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Jenis Tamu</label>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="push-everything"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                value="umum"
                                                {...register('jenis_tamu', { required: true })}
                                                name="jenis_tamu"
                                            />
                                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                Umum
                                            </label>

                                            <input
                                                id="push-email"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 ml-4 text-indigo-600 border-gray-300"
                                                value="pimpinan"
                                                {...register('jenis_tamu', { required: true })}
                                                name="jenis_tamu"
                                            />
                                            <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                Pimpinan
                                            </label>
                                        </div>
                                        {errors.jenis_tamu && errors.jenis_tamu.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan jenis tamu</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Tujuan</label>
                                    <select
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        {...register('tujuan', { required: true })}
                                        name="tujuan"
                                    >
                                        <option value="">Silahkan Pilih</option>
                                        <option value="598546d3-e840-4782-9c43-5b10a8c6b951">Ratna</option>
                                    </select>
                                    {errors.tujuan && errors.tujuan.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan tujuan kunjungan</p>}
                                </div>
                            </div>

                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Keperluan</label>
                                    <input
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('keperluan', { required: true })}
                                        name="keperluan"
                                    />
                                    {errors.keperluan && errors.keperluan.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan keperluan kunjungan</p>}
                                </div>
                            </div>

                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Asal Instansi</label>
                                    <input
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('asal_instansi', { required: true })}
                                        name="asal_instansi"
                                    />
                                    {errors.asal_instansi && errors.asal_instansi.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan asal instansi</p>}
                                </div>
                            </div>

                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nama</label>
                                    <input
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('nama_tamu', { required: true })}
                                        name="nama_tamu"
                                    />
                                    {errors.nama_tamu && errors.nama_tamu.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nama tamu</p>}
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> NIK</label>
                                    <input
                                        type="number"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('nik', { required: true })}
                                        name="nik"
                                    />
                                    {errors.nik && errors.nik.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nik</p>}
                                </div>
                            </div>

                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Telepon</label>
                                    <input
                                        type="number"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('nomor_telepon', { required: true })}
                                        name="nomor_telepon"
                                    />
                                    {errors.nomor_telepon && errors.nomor_telepon.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nomor telepon tamu</p>}
                                </div>
                                <div className="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Alamat</label>
                                    <input
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('alamat', { required: true })}
                                        name="alamat"
                                    />
                                    {errors.alamat && errors.alamat.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan alamat</p>}
                                </div>
                            </div>

                            <div className="w-full flex mb-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => router.push('/kunjungan/buku-tamu')}
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
        </>
    )
}