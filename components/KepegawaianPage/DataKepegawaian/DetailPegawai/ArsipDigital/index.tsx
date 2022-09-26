import React from 'react';

import { classNames } from '../../../../../utils/Components';
import { withErrorBoundary } from '../../../../shared/hocs/ErrorBoundary';
import DetailArsip from './DetailArsip';
import ListArsip from './ListArsip';

function ArsipDigital() {
  const [arsipDigitalId, setArsipDigitalId] = React.useState(0);

  return (
    <>
      <div className={classNames(arsipDigitalId ? 'hidden' : '')}>
        <ListArsip
          onShowDetail={(id: number) => {
            setArsipDigitalId(id);
          }}
        />
      </div>
      {!!arsipDigitalId && (
        <DetailArsip
          arsipDigitalId={arsipDigitalId}
          onBack={() => {
            setArsipDigitalId(0);
          }}
        />
      )}
    </>
  );
}

export default withErrorBoundary(ArsipDigital);
