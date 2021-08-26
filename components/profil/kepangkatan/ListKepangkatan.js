import { Tab } from "@headlessui/react";
import ListJabatan from "./ListJabatan";
import ListGolongan from "./ListGolongan";
import ListPenghasilan from "./ListPenghasilan";

function TabKepegawaian() {
    const tabs = [
        { name: "Riwayat Golongan", href: "#", current: true },
        { name: "Riwayat Jabatan", href: "#", current: false },
        { name: "Riwayat Penghasilan", href: "#", current: false },
    ];
    return (
        <div className="rounded-lg bg-white shadow px-4 py-5 border-b border-gray-200 sm:px-6 mb-3">
            <div className="mb-3">
                <Tab.Group vertical>
                    <Tab.List className="mb-3">
                        {tabs.map((tab) => (
                            <Tab
                                className={({ selected }) =>
                                    selected
                                        ? "border-indigo-500 text-indigo-600 whitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                                }
                            >
                                {tab.name}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel className="active:outline-none">
                            <ListGolongan />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ListJabatan />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ListPenghasilan />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}

export default function ListKepangkatan() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4 lg:col-span-3">
                <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                    <div className="grid md:grid-cols-1 px-6 py-6">
                        <div class="w-full pb-2 ">
                            <dt className="text-lg font-small text-indigo-600">
                                Golongan
                        </dt>

                            <dt className="text-3xl font-medium pt-2 text-gray-900">
                                IV/4
                        </dt>
                        </div>
                    </div>
                </dl>

                <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                    <div className="grid md:grid-cols-1 pb-2 px-6 py-6">
                        <div class="w-full pb-2 ">
                            <dt className="text-lg font-small text-indigo-600">
                                Masa Kerja
                        </dt>

                            <dt className="text-3xl font-medium pt-2 text-gray-900">
                                XX Tahun
                        </dt>
                        </div>
                    </div>
                </dl>

                <dl className="mb-3 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-1 md:divide-y-0 md:divide-x">
                    <div className="grid md:grid-cols-1 pb-2 px-6 py-6">
                        <div class="w-full pb-2 ">
                            <dt className="text-lg font-small text-indigo-600">
                                Penghasilan Bulan Mei 2021
                        </dt>

                            <dt className="text-3xl font-medium pt-2 text-gray-900">
                                RP XX.XXX.XXX
                        </dt>
                        </div>
                    </div>
                </dl>

                <div className="grid grid-cols-1 gap-4 lg:col-span-4">
                    <section aria-labelledby="section-2-title">
                        <TabKepegawaian />
                    </section>
                </div>
            </div>

        </>

    )
}