import MainLayout from "../../components/layouts/MainLayout";
import Head from 'next/head'
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "@heroicons/react/solid";
import KepegawaianNav from "../../components/KepegawaianNav";
import ExampleLineGraph from "../../components/ExampleLineGraph";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profil() {
  return (
    <MainLayout>
      <Head>
        <title>Kepegawaian | Intra DIKTI</title>
      </Head>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Kepegawaian</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-1">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Kepegawaian
              </h2>

              {/* Profile Info */}
              <div className="rounded-lg bg-white shadow border-b border-gray-200 mb-3">
                <KepegawaianNav />
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white shadow py-5 border-b border-gray-200  mb-3">
                <ExampleLineGraph />
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
