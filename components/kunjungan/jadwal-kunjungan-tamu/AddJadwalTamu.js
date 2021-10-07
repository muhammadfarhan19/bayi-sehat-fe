import * as React from 'react'
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { AlertAction } from '../../../action/ActionTypes';
import { useDispatch } from 'react-redux';
import FetcherAlert from '../../shared/alert/FetcherAlert';
import FetcherLoading from '../../shared/loading/fetcherLoading';
import AutoComplete from '../../shared/AutoComplete';
import { request } from '../../shared/fetcher/FetcherHooks';
import config from '../../../utils/Config';
import moment from 'moment';

export default function AddJadwalTamu() {
    const router = useRouter();
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();
    const [load, setLoad] = React.useState(false);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false)
    const [tujuan, setTujuan] = React.useState([])
    const [uuid, setUuid] = React.useState('')
    const [namakunjungan, setNamakunjungan] = React.useState('')

    const handlePost = async (handleSubmit) => {
        setLoad(true)
        let submit = {
            ...handleSubmit,
            tujuan: uuid
        }
        try {
            const post = await request(config.apiHost + '/buku-tamu/post-data-tamu', submit, 'post', true);
            setLoad(false)
            if (post.responseData.status === 'SUCCESS') {
                router.push('/kunjungan/jadwal-kunjungan-tamu')
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

    const nama = (data) => {
        setOpen(data.open)
        setNamakunjungan(data.dataNama)
        setUuid(data.dataUuid)
    }

    const handleOpen = (e) => {
        setNamakunjungan(e.target.value)
        const count = e.target.value.length
        if (count > 1) {
            (async () => {
                try {
                    const getData = await request(config.apiHost + '/buku-tamu/tujuan/' + e.target.value, '', 'get', true);
                    setTujuan(getData.responseData.data)
                } catch (e) {
                    console.log(e)
                }
            })();
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    return (
        <>
            <FetcherAlert />
            {load ? <FetcherLoading /> : ''}
            <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                <div className="bg-white rounded-md shadow">
                    <div className="grid md:grid-cols-3 px-4 sm:p-6 gap-4">
                        <div className="w-full col-span-2 self-center flex cursor-pointer" onClick={() => { router.push('/kunjungan/jadwal-kunjungan-tamu') }}>
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

                    <div class="w-full px-6">
                        <form class="py-1" onSubmit={handleSubmit(handlePost)}>
                            {/* <input type="hidden" {...register('users_id')} name="users_id" value={user?.id} /> */}
                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Tanggal</label>
                                    <input
                                        type="date"
                                        name="c_password"
                                        min={moment().format('YYYY-MM-DD')}
                                        {...register('tanggal_kunjungan', { required: true })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                    {errors.tanggal_kunjungan && <p className="mt-1 text-red-500 text-xs">Silahkan masukan tanggal kunjungan</p>}
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

                            <div className="w-full flex mb-4 gap-4">
                                <div className="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Tujuan</label>
                                    <input
                                        type="tes"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('tujuan', { required: true })}
                                        name="tujuan"
                                        onChange={handleOpen}
                                        autocomplete="off"
                                        value={namakunjungan}

                                    />

                                    {errors.tujuan && <p className="mt-1 text-red-500 text-xs">Silahkan pilih tujuan</p>}
                                </div>
                            </div>

                            {open && <AutoComplete result={nama} dataTujuan={tujuan} />}

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
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

                            <div className="flex align-center mb-3 pt-3 pt-2">
                                <div className="text-xl font-medium text-gray-900 my-auto">
                                    Data Tamu
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
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

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nama</label>
                                    <input
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('nama_tamu', { required: true })}
                                        name="nama_tamu"
                                    />
                                    {errors.nama_tamu && errors.nama_tamu.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nama tamu</p>}
                                </div>
                                <div class="w-1/2">
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

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Telepon</label>
                                    <input
                                        type="number"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                        {...register('nomor_telepon', { required: true })}
                                        name="nomor_telepon"
                                    />
                                    {errors.nomor_telepon && errors.nomor_telepon.type === "required" && <p className="mt-1 text-red-500 text-xs">Silahkan masukan nomor telepon tamu</p>}
                                </div>
                                <div class="w-1/2">
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

                            <div class="w-full flex mb-4 justify-end">
                                <button
                                    type="button"
                                    onClick={() => router.push('/kunjungan/jadwal-kunjungan-tamu')}
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