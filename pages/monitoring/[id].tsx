/* eslint-disable react/jsx-no-undef */
import {
  ArrowCircleLeftIcon,
  LocationMarkerIcon,
  PencilAltIcon,
  PhoneIcon,
  PlusIcon,
  StatusOnlineIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/outline'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import LineChartComponent from '../../components/charts/LineChartComponent'
import AddConditionForm from '../../components/forms/AddConditionForm'
import { withReduxPage } from '../../hooks/ReduxPage'
import { useAPI } from '../../hooks/useAPI'
import { calculateAgeInMonths, filterMonths, formatBabyConditions } from '../../lib/common'
import avatar from '../../public/assets/avatar.png'
import { BabyType } from '../../types/babyType'

const DetailMonitoring = () => {
  const [formModalState, setFormModalState] = React.useState<{
    open: boolean
    type: string | undefined
    selectedId: string | undefined
  }>({
    open: false,
    type: undefined,
    selectedId: undefined,
  })
  const router = useRouter()

  const id = router.query.id

  const handleModal = (open: boolean, type?: string, selectedId?: string) => {
    setFormModalState({
      open,
      type,
      selectedId,
    })
  }

  const { data, isValidating, mutate } = useAPI<BabyType, any>(`http://localhost:4000/baby/${id}`, 'GET')

  const ZScore = data?.status?.score
  console.log(ZScore)

  const dataCondition = formatBabyConditions(data?.baby_condition)

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
            className="flex items-center gap-x-1 rounded-md bg-teal-400 py-2 pl-2 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            onClick={() => handleModal(!formModalState.open, 'add')}
          >
            <PlusIcon className="h-5 w-5" />
            <span>Upload Kondisi</span>
          </button>
        </header>
        <section className="flex flex-col gap-y-14 py-5">
          <div className="flex flex-col gap-y-4">
            <h2 className="text-xl font-semibold">Tabel Kondisi</h2>
            <aside className="inline-block max-h-[250px] min-w-full overflow-auto rounded-lg shadow-md">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Periode
                    </th>
                    <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Umur (bulan)
                    </th>
                    <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Berat (kg)
                    </th>
                    <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Keterangan
                    </th>
                    <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Z-Score
                    </th>
                    <th className="border-b-2 border-teal-400 bg-teal-400 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.baby_condition
                    ?.sort((a: any, b: any) => a.month - b.month)
                    .map((item: any, index: number, array: any[]) => {
                      const weightStatus =
                        index > 0
                          ? item.weight > array[index - 1].weight
                            ? 'naik'
                            : item.weight < array[index - 1].weight
                            ? 'turun'
                            : 'Tetap'
                          : '-'
                      return (
                        <tr key={index}>
                          <td className="border-b border-gray-200 bg-white p-3 text-sm">
                            {filterMonths.filter(arr => arr.value === item.month)[0].text}
                          </td>
                          <td className="border-b border-gray-200 bg-white p-3 text-sm">
                            {calculateAgeInMonths(data?.birthdate, item.month)} Bulan
                          </td>
                          <td className="border-b border-gray-200 bg-white p-3 text-sm">{item.weight}</td>
                          <td className="border-b border-gray-200 bg-white p-3 text-sm">{weightStatus}</td>
                          <td className="border-b border-gray-200 bg-white p-3 text-sm">{ZScore}</td>
                          <td className="flex gap-x-2 border-b border-gray-200 bg-white p-3 text-sm">
                            <button
                              data-twe-toggle="tooltip"
                              data-twe-html="true"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              title="Edit Data"
                              type="button"
                              className="mx-1 rounded-[6px] bg-teal-400 p-1.5 text-[14px] font-normal text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                              onClick={() => {
                                handleModal(!formModalState.open, 'edit', item.id)
                              }}
                            >
                              <PencilAltIcon className="h-4 w-4" />
                            </button>
                            <button
                              data-twe-toggle="tooltip"
                              data-twe-html="true"
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                              title="Hapus Data"
                              type="button"
                              className="focus:ring-ted-500 mx-1 rounded-[6px] bg-red-500 p-1.5 text-[14px] font-normal text-gray-50 focus:outline-none focus:ring-2 focus:ring-red-400  focus:ring-offset-2"
                              // onClick={() => setConfirmId(baby.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </aside>
          </div>
          <aside className="max-h-[300px] w-full">
            <h2 className="mb-4 text-xl font-semibold">Grafik Kondisi</h2>
            <LineChartComponent data={dataCondition} />
          </aside>
        </section>
      </section>
      <section className="flex h-full w-1/3 flex-col space-y-10 rounded-2xl bg-teal-50 p-10">
        <aside className="flex w-auto flex-col items-center gap-y-5 rounded-xl border py-10 shadow-lg">
          <section className="h-[70px] w-[70px] rounded-full">
            <Image src={avatar} alt="avatar" />
          </section>
          <section className="text-center">
            <h1 className="text-lg font-semibold">{data?.name}</h1>
            <h1> {data?.gender === 'male' ? 'Laki-Laki' : 'Perempuan'}</h1>
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
            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
              <span
                aria-hidden
                className={`absolute inset-0 rounded-full opacity-50 ${
                  data?.status?.category === 'Normal'
                    ? 'bg-blue-400'
                    : data?.status?.category === 'Underweight'
                    ? 'bg-yellow-400'
                    : 'bg-red-500 text-white'
                } ${typeof data?.status?.category === null ? 'bg-white' : ''}`}
              ></span>
              <span className="relative">{data?.status?.category}</span>
            </span>
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
      {formModalState.open && (
        <AddConditionForm
          babyId={id}
          open={formModalState.open}
          setOpen={handleModal}
          selectedId={formModalState.selectedId}
          onSuccess={() => mutate()}
        />
      )}
    </main>
  )
}

export default withReduxPage()(DetailMonitoring)
