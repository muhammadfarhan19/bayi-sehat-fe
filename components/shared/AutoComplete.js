import * as React from 'react'
import { CheckCircleIcon, ChevronRightIcon, MailIcon } from '@heroicons/react/solid'
import { request } from './fetcher/FetcherHooks'
import config from '../../utils/Config'
import { useFormContext } from 'react-hook-form'

export default function AutoComplete({ dataTujuan, result }) {
    const handleTujuan = (nama, uuid) => {
        result(
            {
                dataUuid: uuid,
                dataNama: nama,
                open: false
            }
        )
    }

    return (
        <>

            <div className="fixed inset-0" onClick={() => result({open:false})}></div>
            <div className="mt-1 relative">
                <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {dataTujuan?.length > 0 ? (
                        <>
                            {dataTujuan.map((tujuan) => (
                                <li key={tujuan.uuid} onClick={() => handleTujuan(tujuan.nama, tujuan.uuid)} className="cursor-pointer">
                                    <a className="block hover:bg-gray-50">
                                        <div className="flex items-center px-4 py-4 sm:px-6">
                                            <div className="min-w-0 flex-1 flex items-center">
                                                <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-indigo-600 truncate">{tujuan.nama.split('-')[0]}</p>
                                                        <p className="mt-2 flex items-center text-sm text-gray-500">
                                                            <span className="truncate">{tujuan.nama.split('-')[1]}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </>
                    ) : (
                        <li className="cursor-pointer" onClick={() => result({dataUuid: '',dataNama: '',open:false})}>
                            <a className="block hover:bg-gray-50">
                                <div className="flex items-center px-4 py-4 sm:px-6">
                                    <div className="min-w-0 flex-1 flex items-center">
                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                            <div>
                                                <p className="text-sm font-medium text-indigo-600 truncate">Data tidak ditemukan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </>

    )
}