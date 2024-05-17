import React from 'react'

import MonitoringPage from '../../components/MonitoringPage'
import { withReduxPage } from '../../hooks/ReduxPage'

const Monitoring = () => {
  return <MonitoringPage />
}

export default withReduxPage()(Monitoring)
