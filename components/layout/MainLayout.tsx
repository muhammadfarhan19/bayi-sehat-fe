import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React from 'react'

import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { push } = useRouter()
  React.useEffect(() => {
    if (!Cookies.get('token')) push('/login')
  }, [])
  return (
    <main className="relative h-[100dvh] w-full">
      <section className="flex h-full w-full gap-5 p-5">
        <aside className={`absolute hidden h-[910px] w-[400px] transition-all duration-200 xl:relative xl:block`}>
          <Sidebar />
        </aside>
        <aside className="h-full w-full">{children}</aside>
      </section>
    </main>
  )
}

export default MainLayout
