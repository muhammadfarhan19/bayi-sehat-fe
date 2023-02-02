import React from 'react';

import { RiwayatSkpData } from '../../../../../types/api/RiwayatSkpAPI';
import DetailSkp from './DetailSkp';
import ListSkp from './ListSkp';
import ListSkpLama from './RiwayatSkpLama/ListSkpLama';

export default function RiwayatSkp() {
  const [riwayatDetail, setRiwayatDetail] = React.useState<RiwayatSkpData>();

  return (
    <>
      {typeof riwayatDetail === 'undefined' ? (
        <>
          <ListSkpLama
            onShowDetail={(detail: RiwayatSkpData) => {
              setRiwayatDetail(detail);
            }}
          />
          <ListSkp
            onShowDetail={(detail: RiwayatSkpData) => {
              setRiwayatDetail(detail);
            }}
          />
        </>
      ) : (
        <DetailSkp
          detail={riwayatDetail}
          onBack={() => {
            setRiwayatDetail(undefined);
          }}
        />
      )}
    </>
  );
}
