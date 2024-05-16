import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'

import logo from '../../public/assets/logo.png'

interface SidebarLinks {
  name: string
  url: string
}

const Sidebar: React.FC = () => {
  const { reload } = useRouter()
  const links: SidebarLinks[] = [
    {
      name: 'Dashboard',
      url: '/',
    },
    {
      name: 'Monitoring',
      url: '/monitoring',
    },
  ]

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('refreshtoken')
    reload()
  }

  const router = useRouter()

  return (
    <section className="flex h-full w-full flex-col justify-between rounded-2xl border bg-teal-400 px-5 py-10 shadow-lg">
      <section className="h-auto w-full space-y-10">
        <aside className="mx-1 flex flex-col items-center justify-center gap-3 border-b-2 pb-7">
          <Image src={logo} alt="Logo bayi" width={100} height={100} className="drop-shadow-lg" />
          <div className="text-xl font-semibold text-white">bayisehat.com</div>
        </aside>
        <ul className="flex h-auto w-full flex-col space-y-3">
          {links.map((link, index) => (
            <button
              onClick={() => router.push(link.url)}
              key={index}
              className="rounded-full bg-white py-3 text-center font-semibold text-teal-400"
            >
              {link.name}
            </button>
          ))}
        </ul>
      </section>
      <button
        className="rounded-full border bg-white py-3 text-center font-semibold text-red-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </section>
  )
}

export default Sidebar
