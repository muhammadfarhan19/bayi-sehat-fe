import React from 'react';

import { withAuthenticatedPage } from '../../components/hocs/AuthenticatedPage';
import LoginPage from '../../components/LoginPage/LoginPage';

function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}

export default withAuthenticatedPage({ checkLogin: false })(Login);
