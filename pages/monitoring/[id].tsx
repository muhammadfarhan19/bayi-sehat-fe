/* eslint-disable react/jsx-no-undef */
import {
  ArrowCircleLeftIcon,
  LocationMarkerIcon,
  PhoneIcon,
  PlusIcon,
  StatusOnlineIcon,
  UserIcon,
} from '@heroicons/react/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

import AddConditionForm from '../../components/forms/AddConditionForm'
import { calculateAgeInMonths, DETAIL_TABLE_HEAD, DUMMY_CONDITION } from '../../lib/common'
import { BabyType } from '../../types/babyType'
import { BabyCondition } from '../../types/conditionType'

const DetailMonitoring = () => {
  const [data, setData] = React.useState<BabyType | undefined>(undefined)
  const [condition, setCondition] = React.useState<BabyCondition | undefined>(undefined)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const router = useRouter()

  const id = router.query.id

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  React.useEffect(() => {
    const fetchDetailBaby = async (id: any) => {
      const response = await axios.get(`http://localhost:4000/baby/${id}`)
      setData(response.data.data)
    }
    const fetchBabyCondition = async (id: any) => {
      const response = await axios.get(`http://localhost:4000/condition/${id}`)
      setCondition(response.data.data)
    }
    fetchBabyCondition(id)
    fetchDetailBaby(id)
  }, [])

  return (
    <main className="min-h-auto flex h-[910px] rounded-2xl border border-teal-400 shadow-lg">
      <section className="h-full w-3/4 px-10">
        <header className="flex items-center justify-between py-10">
          <button
            className="flex w-auto items-center gap-x-1 text-2xl font-semibold"
            onClick={() => router.push('/monitoring')}
          >
            <ArrowCircleLeftIcon className="h-5 w-5" />
            <h1 className="text-xl">kembali</h1>
          </button>
          <button
            className="flex items-center gap-x-1 rounded-md bg-teal-400 py-2 pl-2 pr-4 text-sm text-white"
            onClick={() => handleModal()}
          >
            <PlusIcon className="h-5 w-5" />
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
                TODO : fetch baby conditions
                {/* {condition.((item: any, index: number) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.month}</td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">
                      {calculateAgeInMonths(data?.birthdate)} Bulan
                    </td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.berat}</td>
                    <td className="border-b border-gray-200 bg-white p-5 text-sm">{item.tinggi}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </aside>
          {/* TODO : Chart */}
          <aside className="max-h-[300px] w-full">{/* <LineChartComponent /> */}</aside>
        </section>
      </section>
      <section className="flex h-full w-1/3 flex-col space-y-10 rounded-2xl bg-teal-50 p-10">
        <aside className="flex w-auto flex-col items-center gap-y-5 rounded-xl border py-10 shadow-lg">
          <section className="h-[70px] w-[70px] rounded-full">{/* <Image src={avatar} alt="avatar" /> */}</section>
          <section className="text-center">
            <h1>{data?.name}</h1>
            <h1>{data?.gender}</h1>
          </section>
        </aside>
        <aside className="h-auto w-full space-y-5">
          <section className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md">
            <UserIcon className="h-5 w-5" />
            <h1>{data?.parent_name}</h1>
          </section>
          <section className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md">
            <LocationMarkerIcon className="h-5 w-5" />
            <h1>{data?.address}</h1>
          </section>
          <section className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md">
            <StatusOnlineIcon className="h-5 w-5" />
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
            // href={`https://wa.me/${phoneNumberConverter(data.phone_number)}`}
            target="blank"
            className="flex cursor-pointer items-center gap-x-3 rounded-xl border bg-teal-400 p-3 transition-all duration-100 hover:shadow-md"
          >
            <PhoneIcon className="h-5 w-5" />
            <h1>Hubungi Orang Tua</h1>
          </a>
        </aside>
      </section>
      {openModal && <AddConditionForm babyId={id} open={openModal} setOpen={handleModal} />}
    </main>
  )
}

export default DetailMonitoring
