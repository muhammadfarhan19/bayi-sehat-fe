import React from 'react';

import { RiwayatSkpListData } from '../../../../../types/api/RiwayatSkpAPI';
import DetailSkp from './DetailSkp';
import ListSkp from './ListSkp';

export default function RiwayatSkp() {
  const [riwayatDetail, setRiwayatDetail] = React.useState<RiwayatSkpListData>();
  return (
    <>
      {typeof riwayatDetail === 'undefined' ? (
        <ListSkp
          onShowDetail={(detail: RiwayatSkpListData) => {
            setRiwayatDetail(detail);
          }}
        />
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
