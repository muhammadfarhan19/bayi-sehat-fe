import {
  ArrowCircleLeftIcon,
  LocationMarkerIcon,
  PhoneIcon,
  PlusIcon,
  StatusOnlineIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { calculateAgeInMonths, DETAIL_TABLE_HEAD, DUMMY_CONDITION, phoneNumberConverter } from '../../../lib/common'
import avatar from '../../../public/assets/avatar.png'

async function DetailMonitoringPage({ data }: { data: any }) {
  // const [openModal, setOpenModal] = React.useState<boolean>(false)
  const router = useRouter()

  return (
    <main className="min-h-auto flex h-[910px] rounded-2xl border border-teal-400 shadow-lg">
      <section className="h-full w-3/4 px-10">
        <header className="flex items-center justify-between py-10">
          <button
            className="flex w-auto items-center gap-x-1 text-2xl font-semibold"
            onClick={() => router.push('/monitoring')}
          >
            <ArrowCircleLeftIcon />
            <h1 className="text-xl">kembali</h1>
          </button>
          <button
            className="flex items-center gap-x-1 rounded-md bg-teal-400 py-2 pl-2 pr-4 text-sm text-white"
            // onClick={() => setOpenModal(!openModal)}
          >
            <PlusIcon />
            <span>Upload Kondisi</span>
          </button>
        </header>
        <section className="flex flex-col gap-y-5 py-5">
          <aside className="inline-block max-h-[350px] min-w-full overflow-auto rounded-lg shadow-md">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {DETAIL_TABLE_HEAD.map((item: string, index: number) => (
                    <th
                      key={index}
                      className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DUMMY_CONDITION.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.month}</td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      {calculateAgeInMonths(data?.birthdate)} Bulan
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.berat}</td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.tinggi}</td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.BMI()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </aside>
          {/* TODO : Chart */}
          <aside className="max-h-[300px] w-full">{/* <LineChartComponent /> */}</aside>
        </section>
      </section>
      <section className="flex h-full w-1/3 flex-col space-y-10 rounded-2xl bg-teal-50 p-10">
        <aside className="flex w-auto flex-col items-center gap-y-5 rounded-xl border py-10 shadow-lg">
          <section className="h-[70px] w-[70px] rounded-full">
            <Image src={avatar} alt="avatar" />
          </section>
          <section className="text-center">
            <h1>{data?.name}</h1>
            <h1>{data?.gender}</h1>
          </section>
        </aside>
        <aside className="h-auto w-full space-y-5">
          <section className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md">
            {/* <MotherIcon /> */}
            <h1>{data?.parent_name}</h1>
          </section>
          <section className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md">
            <LocationMarkerIcon />
            <h1>{data?.address}</h1>
          </section>
          <section className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md">
            <StatusOnlineIcon />
            {/* <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
              <span
                aria-hidden
                className={`rounded-ful absolute inset-0 rounded-full border border-teal-400  ${
                  data?.is_stunted ? 'bg-red-400 text-red-900' : 'bg-teal-200'
                }`}
              ></span>
              <span className="relative">{data?.is_stunted ? 'Stunting' : 'Sehat'}</span>
            </span> */}
          </section>
          <a
            href={`https://wa.me/${phoneNumberConverter(data.phone_number)}`}
            target="blank"
            className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md"
          >
            <PhoneIcon />
            <h1>Hubungi Orang Tua</h1>
          </a>
        </aside>
      </section>
      {/* {openModal && (
        <AddFormCondition
          open={openModal}
          setOpen={handleModal}
          onSuccess={() => router.refresh()}
          id={id}
        />
      )} */}
    </main>
  )
}

export default DetailMonitoringPage
