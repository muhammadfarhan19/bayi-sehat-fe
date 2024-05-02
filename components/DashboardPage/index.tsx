// import axios from 'axios'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'

import boyBaby from '../../public/assets/boy.png'
import girlBaby from '../../public/assets/girl.png'
import { BabyType } from '../../types/babyType'

const DashboardPage: React.FC = () => {
  const [data, setData] = React.useState([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`http://localhost:4000/baby`)
      setData(response.data.data)
      setIsLoading(false)
    }
    getData()
  }, [])
  // console.log(data)

  const totalBabies = data?.length
  const boyBabies = data?.map((baby: BabyType) => baby).filter((baby: BabyType) => baby.gender === 'male').length
  const girlBabies = data?.map((baby: BabyType) => baby).filter((baby: BabyType) => baby.gender === 'female').length

  return (
    <main className="min-h-auto flex h-[910px] flex-col gap-10 rounded-2xl border border-teal-400 px-10 py-5 shadow-lg">
      <header className="flex items-center justify-between">
        <aside className="w-auto text-2xl font-semibold">Dashboard</aside>
        <aside
          // className={`w-auto cursor-pointer rounded-md px-4 py-2 hover:bg-gray-50 ${user && 'border-b-2'}`}
          className={`w-auto cursor-pointer rounded-md px-4 py-2 hover:bg-gray-50`}
        >
          {/* {user} */}
          nama
        </aside>
      </header>
      <section className="flex h-full w-full flex-col items-start">
        <aside className="grid h-1/3 w-full grid-cols-3 gap-x-5">
          <div className="flex h-full w-full cursor-pointer items-center justify-center gap-5 rounded-xl bg-teal-400 px-3 text-white shadow-lg duration-100 ease-in-out hover:-translate-y-0.5">
            <aside className="flex gap-2">
              <Image src={boyBaby} alt="Bayi Laki-Laki" width={40} />
              <Image src={girlBaby} alt="Bayi Perempuan" width={40} />
            </aside>
            <aside className="border-s-2 grid place-items-center gap-y-3 pl-5">
              <h1 className="text-3xl font-semibold">Total Bayi</h1>
              <h1 className="text-5xl font-bold">{isLoading ? '-' : totalBabies}</h1>
            </aside>
          </div>
          <div className="flex h-full w-full cursor-pointer items-center justify-center gap-5 rounded-xl bg-teal-400 px-3 text-white shadow-lg duration-100 ease-in-out hover:-translate-y-0.5">
            <aside>
              <Image src={boyBaby} alt="Bayi Laki-Laki" width={40} />
            </aside>
            <aside className="border-s-2 grid place-items-center gap-y-3 pl-5">
              <h1 className="text-3xl font-semibold">Laki-Laki</h1>
              <h1 className="text-5xl font-bold">{isLoading ? '-' : boyBabies}</h1>
            </aside>
          </div>
          <div className="flex h-full w-full cursor-pointer items-center justify-center gap-5 rounded-xl bg-teal-400 px-3 text-white shadow-lg duration-100 ease-in-out hover:-translate-y-0.5">
            <aside>
              <Image src={girlBaby} alt="Bayi Perempuan" width={40} />
            </aside>
            <aside className="border-s-2 grid place-items-center gap-y-3 pl-5">
              <h1 className="text-3xl font-semibold">Perempuan</h1>
              <h1 className="text-5xl font-bold">{isLoading ? '-' : girlBabies}</h1>
            </aside>
          </div>
        </aside>
        <aside className="grid h-1/2 w-full grid-cols-2 items-center gap-x-5">
          {/* sehat:stunting */}
          <div className="flex h-[350px] w-full items-center rounded-md border border-teal-400 shadow-md hover:cursor-pointer">
            {/* <PieChartComponent /> */}
            <section className="flex flex-col justify-between gap-5 px-5">
              <aside className="flex items-center gap-5">
                <div className="h-[20px] w-[20px] rounded-full bg-[#0088FE]" />
                <h1>Stunting</h1>
              </aside>
              <aside className="flex items-center gap-5">
                <div className="h-[20px] w-[20px] rounded-full bg-teal-400" />
                <h1>Tidak Stunting</h1>
              </aside>
            </section>
          </div>
          {/* boy:girl */}
          <div className="flex h-[350px] w-full items-center rounded-md border border-teal-400 shadow-md hover:cursor-pointer">
            {/* <PieChartComponent /> */}
            <section className="flex flex-col justify-between gap-5 px-5">
              <aside className="flex items-center gap-5">
                <div className="h-[20px] w-[20px] rounded-full bg-[#0088FE]" />
                <h1>Laki-Laki</h1>
              </aside>
              <aside className="flex items-center gap-5">
                <div className="h-[20px] w-[20px] rounded-full bg-teal-400" />
                <h1>Perempuan</h1>
              </aside>
            </section>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default DashboardPage
