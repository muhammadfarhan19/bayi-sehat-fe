import { ChevronLeftIcon } from '@heroicons/react/solid';
import React from 'react';

import { withErrorBoundary } from '../../shared/hocs/ErrorBoundary';
import AutoComplete from '../../shared/Input/ComboBox';
import Pagination from '../../shared/Pagination';

const dummyListJenisKepangkatan = [
    'Reguler',
    'Jabatan Struktural (JS)'
];

const dummyListBerkas = [
    'Nota Usul',
    'Surat Pengantar'
]

const dummyListFile = [{
    fileName: 'Nota Usul',
    dateUploaded: '16/4/2022  08:21 WIB'
}, {
    fileName: 'Surat Pengantar',
    dateUploaded: '16/4/2022  08:21 WIB'
}]

function BerkasKenaikanPangkat() {

    return (
        <>
            <section aria-labelledby="section-1-title">
                <div className="rounded-lg bg-white shadow">
                    <a href="/kepegawaian/daftar-jabatan" className="flex flex-row items-center gap-x-2 py-6 px-6">
                        <ChevronLeftIcon className="h-8 w-8" />
                        <div>Kembali</div>
                    </a>

                    <div className="rounded-[8px] bg-white px-6 pb-6">
                        <div className="text-xl font-semibold tracking-wide">Pengajuan Kenaikan Pangkat</div>

                        <div className="mt-5 sm:col-span-6">
                            <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                                Nama
                            </label>
                            <div className="mt-1">
                                <input
                                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                                    disabled={true}
                                    name="nip"
                                    type="text"
                                    value={'38923928392'}
                                />
                            </div>
                        </div>

                        <div className="mt-5 sm:col-span-6">
                            <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                                NIP
                            </label>
                            <div className="mt-1">
                                <input
                                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                                    disabled={true}
                                    name="nip"
                                    type="text"
                                    value={'38923928392'}
                                />
                            </div>
                        </div>

                        <div className="mt-5 sm:col-span-6">
                            <label htmlFor="nip" className="block text-sm font-medium text-gray-700">
                                Instansi
                            </label>
                            <div className="mt-1">
                                <input
                                    className="block w-full rounded-md border-gray-300 shadow-sm disabled:bg-gray-200 sm:text-sm"
                                    disabled={true}
                                    name="nip"
                                    type="text"
                                    value={'38923928392'}
                                />
                            </div>
                        </div>

                        <div className="mt-5 sm:col-span-6">
                            <AutoComplete
                                label={'Jenis Kenaikan Pangkat'}
                                onChange={value => {
                                    console.log(value);
                                }}
                                defaultValue={{ text: 'Pilih', value: '*' }}
                                options={dummyListJenisKepangkatan.map(each => ({
                                    text: each,
                                    value: each,
                                }))}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="section-1-title">
                <div className="rounded-lg bg-white shadow">
                    <h3 className="text-xl font-medium leading-6 text-gray-700 px-6 pt-4">Berkas Kenaikan Pangkat</h3>
                    <div className="flex flex-col">
                        <div className="my-[24px] overflow-x-auto sm:mx-0 ">
                            <div className="align-start inline-block min-w-full sm:px-0 lg:px-0">
                                <div className="overflow-hidden sm:rounded-lg">
                                    <table className="w-full table-auto rounded-lg bg-gray-100">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Nama File
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Tanggal Upload
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                                                >
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dummyListFile.map((data, dataIdx) => (
                                                <tr
                                                    key={dataIdx}
                                                    className={dataIdx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}
                                                >
                                                    <td className="font-regular px-6 text-xs text-gray-500">{dataIdx + 1}</td>
                                                    <td className="font-regular px-6 text-xs text-indigo-600">
                                                        <a href={`#`}>{data.fileName}</a>
                                                    </td>
                                                    <td className="font-regular px-6 text-xs text-gray-500">{data.dateUploaded}</td>
                                                    <td className="font-regular px-6 py-4 text-xs text-gray-500">
                                                        <a
                                                            href={`#`}
                                                            className="rounded-[4px] bg-indigo-600 px-[11px] py-[7px] text-xs font-medium text-gray-50 focus:outline-none"
                                                        >
                                                            Lihat
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        onChange={value => {
                                            console.log(value);
                                        }}
                                        totalData={dummyListFile.length}
                                        perPage={20}
                                        page={1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="section-1-title">
                <div className="rounded-lg bg-white shadow">
                    <div className="rounded-[8px] bg-white px-6 pb-6 pt-4">
                        <h3 className="text-xl font-medium leading-6 text-gray-700">Ceklist Kelengkapan Berkas</h3>
                        <p className="text-sm font-light leading-8 text-gray-700">
                            Berkas fisik yang tidak ditanda tangani oleh pejabat yang seharusnya wajib melampirkan surat penunjukkan PLT
                        </p>
                        {dummyListBerkas.map(each =>
                        (<div className="flex items-center py-1">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                checked={false}
                                onChange={() => { console.log('') }}
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                                {each}
                            </label>
                        </div>)
                        )}
                        <div className="my-3 flex items-center">
                            <div className="flex flex-1 pr-2 text-sm text-gray-500"></div>
                            <button
                                type="button"
                                className="mr-6 inline-flex items-center rounded border border-transparent bg-gray-400 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-500 disabled:bg-gray-200 disabled:text-gray-200"
                                onClick={() => console.log('')}
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-indigo-200 disabled:text-gray-200"
                                onClick={() => console.log('')}
                            >
                                Lanjut
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default withErrorBoundary(BerkasKenaikanPangkat);
