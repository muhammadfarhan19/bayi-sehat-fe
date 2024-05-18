import Image from 'next/image'
import React from 'react'

import babyImage from '../../public/assets/logo.png'

const NotFound: React.FC = () => {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex h-auto w-1/3 flex-col space-y-10 rounded-tl-[200px] rounded-br-[200px] bg-teal-400 p-20">
        <Image src={babyImage} alt="Belum Ada Anak Terdaftar" />
        <h1 className="text-center text-3xl font-extrabold uppercase text-white">belum ada anak terdaftar</h1>
      </div>
    </div>
  )
}

export default NotFound
