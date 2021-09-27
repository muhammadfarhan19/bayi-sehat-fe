import * as React from 'react'
import { useRouter } from "next/router";

export default function EditBukuTamu() {
    const router = useRouter();

    return (
        <>
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
                        <form class="py-1">
                            {/* <input type="hidden" {...register('users_id')} name="users_id" value={user?.id} /> */}
                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Tanggal Kunjungan</label>
                                    <input
                                        type="date"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Kartu</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        readOnly
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Jam Mulai</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Jam Selesai</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        readOnly
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Tujuan</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Keperluan</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-full">
                                    <label className="block text-gray-700 text-sm mb-2"> Asal Instansi</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nama</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> NIK</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        readOnly
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                            </div>

                            <div class="w-full flex mb-4 gap-4">
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Nomor Telepon</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
                                </div>
                                <div class="w-1/2">
                                    <label className="block text-gray-700 text-sm mb-2"> Alamat</label>
                                    <input
                                        type="text"
                                        name="c_password"
                                        readOnly
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-transparent"
                                    />
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