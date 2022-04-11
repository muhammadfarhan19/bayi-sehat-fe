import React from 'react';

import { withErrorBoundary } from '../../../../shared/hocs/ErrorBoundary';
import DetailArsip from './DetailArsip';
import ListArsip from './ListArsip';

function ArsipDigital() {
  const [arsipDigitalId, setArsipDigitalId] = React.useState(0);

  return (
    <>
      {arsipDigitalId === 0 ? (
        <ListArsip
          onShowDetail={(id: number) => {
            setArsipDigitalId(id);
          }}
        />
      ) : (
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

export default withErrorBoundary<typeof ArsipDigital, unknown>(ArsipDigital);
