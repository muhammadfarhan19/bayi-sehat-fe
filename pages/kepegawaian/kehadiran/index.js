import MainLayout from "../../../components/layouts/MainLayout";
import ModuleNavigation from "../../../components/navigation/ModuleNavigation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import TabelDataKehadiran from "../../../components/kepegawaian/kehadiran/TabelDataKehadiran";
import TabelKlaimKehadiran from "../../../components/kepegawaian/kehadiran/TabelKlaimKehadiran";
import { expiry } from "../../../components/shared/fetcher/FetcherHooks";
import config from "../../../utils/Config";
import { Tab } from "@headlessui/react";

export default function Kehadiran() {
  const router = useRouter();
  const [loadPage, setLoadPage] = useState(false);
  const token = Cookies.get("token");

  const check = expiry();

  useEffect(() => {
    (async () => {
      try {
        const checkExpiry = await check();
        if (checkExpiry.responseData.data !== null) {
          setLoadPage(true);
        } else {
          router.push("/login");
        }
      } catch (e) {
        router.push("/login");
      }
    })();
  }, []);

  if (!loadPage) {
    return <></>;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-4 lg:gap-8">
        <ModuleNavigation />
        <div className="grid grid-cols-1 gap-4 lg:col-span-3 transition duration-500 ease-in-out">
          <div class="bg-white rounded">
            <div class="border-b border-gray-200 ">
              <Tab.Group>
                <Tab.List className="-mb-px flex space-x-8 mx-5 py-3">
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "border-indigo-500 text-indigo-600 border-transparent text-gray-800 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus:outline-none"
                        : "border-transparent text-gray-800 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus:outline-none"
                    }
                  >
                    Kehadiran Pegawai
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "border-indigo-500 text-indigo-600 border-transparent text-gray-800 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus:outline-none"
                        : "border-transparent text-gray-800 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm focus:outline-none"
                    }
                  >
                    Klaim Kehadiran
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <TabelDataKehadiran />
                  </Tab.Panel>
                  <Tab.Panel>
                    <TabelKlaimKehadiran />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" --> */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
