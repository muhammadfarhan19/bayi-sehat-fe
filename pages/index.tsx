import React from 'react'

import DashboardPage from '../components/DashboardPage'
import { withReduxPage } from '../hooks/ReduxPage'

function Home() {
  return <DashboardPage />
}

export default withReduxPage()(Home)
