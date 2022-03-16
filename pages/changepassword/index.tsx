import React from 'react';

import ChangePasswordPage from '../../components/ChangePasswordPage';
import { withAuthenticatedPage } from '../../components/shared/hocs/AuthenticatedPage';
import { withReduxPage } from '../../components/shared/hocs/ReduxPage';

function ChangePassword() {
  return <ChangePasswordPage />;
}

export default withReduxPage()(withAuthenticatedPage()(ChangePassword));
