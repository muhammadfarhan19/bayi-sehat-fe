/* eslint-disable react/jsx-no-undef */
import Image from 'next/image'
import React from 'react'

import logo from '../../public/assets/logo.png'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-[95dvh] w-full gap-5 rounded-2xl bg-teal-400 p-5">
      <aside className="flex h-full w-[450px] items-center justify-center rounded-2xl bg-white px-5">{children}</aside>
      <aside className="flex w-full flex-col items-center justify-center gap-10">
        <Image src={logo} alt="logo" width={400} height={400} />
        <div className="text-center text-2xl font-medium text-white">
          Sayangi Bayi Kita <br /> Cegah Stunting Sejak Dini
        </div>
      </aside>
    </main>
  )
}

export default AuthLayout
