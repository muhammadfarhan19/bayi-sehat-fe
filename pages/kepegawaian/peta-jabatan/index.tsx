import { withAuthenticatedPage } from '../../../components/hocs/AuthenticatedPage';
import { withReduxPage } from '../../../components/hocs/ReduxPage';

function PesertaJabatan() {
  return <></>;
}

export default withReduxPage()(withAuthenticatedPage()(PesertaJabatan));
