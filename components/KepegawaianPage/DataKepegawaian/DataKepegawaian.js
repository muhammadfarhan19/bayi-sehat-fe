import React from "react"
import { classNames } from "../../../utils/Components"
import MasterPns from "./MasterPNS/MasterPns"
import MasterPpnpn from "./MasterPPNPN/MasterPpnpn"

export default function DataKepegawaian() {
    const tabs = [
        { name: 'Master PNS', href: '#' },
        { name: 'Master PPNPN', href: '#' },
    ]

    const [selected, setSelected] = React.useState('Master PNS')

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-6">
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
            </div>
            <div>
                {selected === 'Master PNS' ? <MasterPns /> : <MasterPpnpn />}
            </div>
        </div>
    )
}