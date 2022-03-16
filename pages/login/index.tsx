import React from 'react';

import LoginPage from '../../components/LoginPage';
import { withAuthenticatedPage } from '../../components/shared/hocs/AuthenticatedPage';

function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}

export default withAuthenticatedPage({ checkLogin: false })(Login);
