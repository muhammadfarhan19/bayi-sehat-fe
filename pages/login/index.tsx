import React from 'react'

import LoginPage from '../../components/forms/LoginPage'
import { withReduxPage } from '../../hooks/ReduxPage'

const Login = () => {
  return <LoginPage />
}

export default withReduxPage()(Login)
