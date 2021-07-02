import { useRouter } from "next/router";

export default function AddUser() {
    const router = useRouter();
    return (
        <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
                <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                    <div className="overflow-x-auto sm:mx-0 ">
                        <div className="py-2 align-start inline-block min-w-full sm:px-0 lg:px-0">
                            <div class="w-full">
                                <form class="py-5">
                                    <div class="w-full flex mb-4">
                                        <div class="w-1/2 px-6">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username</label>
                                            <input
                                                type="text"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div class="w-1/2 px-6">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
                                            <input
                                                type="text"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full flex mb-4">
                                        <div class="w-1/2 px-6">
                                            <label class="block text-gray-700 text-sm font-bold mb-2"> Kata Sandi</label>
                                            <input
                                                type="text"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div class="w-1/2 px-6">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Kata Santi Baru</label>
                                            <input
                                                type="text"
                                                required
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full flex mb-4">
                                        <div class="w-1/2 px-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2"> Nama Organisasi</label>
                                            <select class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                                <option>Sesditjen</option>
                                                <option>Belmawa</option>
                                                <option>Ahai</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="w-full flex mb-4 px-6">
                                        <button
                                            type="button"
                                            onClick={()=>router.push('/admin/manajemen-user')}
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
    )
}