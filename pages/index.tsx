import { useRouter } from 'next/router'
import React from 'react'

import DashboardPage from '../components/DashboardPage'
import { useAuth } from '../hooks/useAuth'

function Home() {
  return <DashboardPage />
}

export default Home
