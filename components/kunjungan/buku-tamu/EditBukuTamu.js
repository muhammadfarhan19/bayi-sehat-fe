import * as React from 'react'
import { useRouter } from "next/router";
import { request } from '../../shared/fetcher/FetcherHooks';
import config from '../../../utils/Config';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import FetcherAlert from '../../shared/alert/FetcherAlert';
import FetcherLoading from '../../shared/loading/fetcherLoading';
import { useDispatch } from 'react-redux';
import { AlertAction } from '../../../action/ActionTypes';

export default function EditBukuTamu() {
    const router = useRouter();
    const { handleSubmit, register, reset, getValues, formState: { errors } } = useForm();
    const [load, setLoad] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (router.query.id) {
            (async () => {
                try {
                    const getTamu = await request(config.apiHost + '/buku-tamu/' + router.query.id, '', 'get', true);
                    reset({
                        tanggal_kunjungan: moment(getTamu.responseData.data?.tanggal_kunjungan).format('YYYY-MM-DD'),
                        nomor_kartu: getTamu.responseData.data?.nomor_kartu,
                        waktu_mulai: getTamu.responseData.data?.waktu_mulai, 
                        waktu_selesai: getTamu.responseData.data?.waktu_selesai,
                        keperluan: getTamu.responseData.data?.keperluan,
                        asal_instansi: getTamu.responseData.data?.asal_instansi,
                        nama_tamu: getTamu.responseData.data?.nama_tamu,
                        nik: getTamu.responseData.data?.nik,
                        nomor_telepon: getTamu.responseData.data?.nomor_telepon,
                        alamat: getTamu.responseData.data?.alamat,
                    });
                } catch (e) {
                    console.log(e)
                }
            })();
        }
    }, [router])

    const handleCuti = async (handleSubmit) => {
        setLoad(true)
        try {
            let submit = {
                ...handleSubmit,
                tujuan: '598546d3-e840-4782-9c43-5b10a8c6b951'
            }
            const post = await request(config.apiHost + '/buku-tamu/update/' + router.query.id, submit, 'put', true);
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
                            Edit Data Buku Tamu
                        </div>
                    </div>

                    <div class="w-full px-6">
                        <form class="py-1" onSubmit={handleSubmit(handleCuti)}>
                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Tanggal Kunjungan</label>
                                    <input
                                        type="date"
                                        placeholder="Date"
                                        min={moment().format('YYYY-MM-DD')}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        name="tanggal_kunjungan"
                                        {...register('tanggal_kunjungan', { required: true })}
                                    />
                                    {errors.tanggal_kunjungan && <p className="mt-1 text-red-500 text-xs">Silahkan masukan tanggal kunjungan</p>}
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Kartu</label>
                                    <input
                                        type="text"
                                        name="nomor_kartu"
                                        {...register('nomor_kartu', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.nomor_kartu && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nomor kartu</p>}
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Jam Mulai</label>
                                    <input
                                        type="time"
                                        name="waktu_mulai"
                                        {...register('waktu_mulai',
                                            {
                                                validate: (value) => value < getValues('waktu_selesai')
                                            }
                                        )}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.waktu_mulai && <p className="mt-1 text-red-500 text-xs"> Silahkan masukan jam mulai, jam mulai tidak boleh lebih besar dari jam selesai </p>}
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Jam Selesai</label>
                                    <input
                                        type="time"
                                        name="waktu_selesai"
                                        {...register('waktu_selesai',
                                        {
                                            validate: (value) => value > getValues('waktu_mulai')
                                        }
                                    )}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.waktu_selesai && <p className="mt-1 text-red-500 text-xs">Silahkan masukan jam selesai, jam selesai tidak boleh lebih kecil dari jam mulai</p>}
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Tujuan</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        defaultValue="Ratna"
                                        readOnly
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm placeholder-gray-400 bg-gray-100 focus:ring-transparent cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Keperluan</label>
                                    <input
                                        type="text"
                                        name="keperluan"
                                        {...register('keperluan', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.keperluan && <p className="mt-1 text-red-500 text-xs">Silahkan masukan keperluan</p>}
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Asal Instansi</label>
                                    <input
                                        type="text"
                                        name="asal_instansi"
                                        {...register('asal_instansi', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.asal_instansi && <p className="mt-1 text-red-500 text-xs">Silahkan masukan asal instansi</p>}
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nama</label>
                                    <input
                                        type="text"
                                        name="nama_tamu"
                                        {...register('nama_tamu', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.nama_tamu && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nama tamu</p>}
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> NIK</label>
                                    <input
                                        type="number"
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() } 
                                        name="nik"
                                        {...register('nik', {required:true})}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.nik && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nik</p>}
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Telepon</label>
                                    <input
                                        type="number"
                                        onKeyDown={ (evt) => evt.key === 'e' && evt.preventDefault() } 
                                        name="nomor_telepon"
                                        {...register('nomor_telepon', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.nomor_telepon && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nomor telepon</p>}
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Alamat</label>
                                    <input
                                        type="text"
                                        name="alamat"
                                        {...register('alamat', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.alamat && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nomor alamat</p>}
                                </div>
                            </div>

                            <div class="w-full flex mb-4 justify-end">
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