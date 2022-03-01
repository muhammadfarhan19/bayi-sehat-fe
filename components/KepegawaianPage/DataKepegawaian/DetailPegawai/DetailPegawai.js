import React from "react"
import { classNames } from "../../../../utils/Components"

export default function DetailPegawai() {
    const tabs = [
        { name: 'Data Diri Pegawai', href: '#' },
        { name: 'Data Diri Pribadi', href: '#' },
        { name: 'Riwayat Pendidikan', href: '#' },
        { name: 'Riwayat Jabatan', href: '#' },
        { name: 'Arsip Digital', href: '#' },
        { name: 'Tanda Tangan Digital', href: '#' },
    ]

    const [selected, setSelected] = React.useState('Data Diri Pegawai')

    return (
        <>
            <div className="rounded-[8px] py-6 flex flex-row px-[24px] gap-x-[20px] bg-white shadow">
                <img src="../../../detail-pegawai/img.svg" className="w-[88px] h-[88px]" />
                <div className="flex flex-col my-auto">
                    <p className="text-[24px] font-[700]">Widodo</p>
                    <p className="text-[14px] font-[500] text-[#6B7280]">Analis Sumber Daya Manusia Aparatur Ahli Muda</p>
                </div>
            </div>
            <div className="rounded-[8px] py-6 flex flex-row px-[24px] gap-x-[20px] mt-[12px] bg-white shadow overflow-auto">
                <div>
                    <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                            Select a tab
                        </label>
                        <select
                            id="tabs"
                            name="tabs"
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue={tabs.find((tab) => tab.name)}
                        >
                            {tabs.map((tab) => (
                                <option key={tab.name}>{tab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="hidden sm:block">
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {tabs.map((tab) => (
                                    <a
                                        key={tab.name}
                                        href={tab.href}
                                        onClick={() => setSelected(tab.name)}
                                        className={classNames(
                                            tab.name === selected
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                        )}
                                        aria-current={tab.current ? 'page' : undefined}
                                    >
                                        {tab.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead></thead>
                            <tbody className="bg-white divide-y divide-gray-200">

                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Unit Kerja</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">NIP/NIP Lama</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Tempat, Tanggal Lahir</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">TMT CPNS</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Status CPNS/PNS</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Jabatan</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Golongan</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">TMT Golongan</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Pangkat</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Masa Kerja</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Status</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#6B7280]">Karpeg</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}