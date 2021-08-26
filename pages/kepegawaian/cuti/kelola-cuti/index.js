import ListKelola from "../../../../components/kepegawaian/cuti/kelola-cuti/ListKelola";
import ListBatal from "../../../../components/kepegawaian/cuti/kelola-cuti/ListBatal";
import MainLayout from "../../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../../components/navigation/ModuleNavigation";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function KelolaCuti() {
  const tabs = [
    { name: "Pengajuan Cuti", href: "#", count: 3, current: true },
    { name: "Pembatalan Cuti", href: "#", count: 1, current: false },
  ];

  return (
    <MainLayout>
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
          <ModuleNavigation />
          <div className="grid grid-cols-1 gap-4 lg:col-span-3 transition duration-500 ease-in-out">
            <div className="rounded-lg bg-white shadow py-5 border-b border-gray-200 mb-3">
              <div className="mb-3">
                <Tab.Group vertical>
                  <Tab.List className="mb-3 px-4 sm:px-6">
                    {tabs.map((tab) => (
                      <>
                        <Tab
                          className={({ selected }) =>
                            selected
                              ? "border-indigo-500 text-indigo-600 whitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hitespace-nowrap pb-2 px-3 border-b-2  text-sm focus:outline-none"
                          }
                        >
                          {tab.name}
                        </Tab>
                      </>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel className="active:outline-none">
                      <ListKelola />
                    </Tab.Panel>
                    <Tab.Panel>
                      <ListBatal />
                    </Tab.Panel>
                    <Tab.Panel>

                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>
    </MainLayout>
  );
}
