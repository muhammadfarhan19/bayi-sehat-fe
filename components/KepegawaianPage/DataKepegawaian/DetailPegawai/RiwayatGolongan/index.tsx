import React from 'react';

import { RiwayatGolonganListData } from '../../../../../types/api/GolonganAPI';
import DetailGolongan from './DetailGolongan';
import ListGolongan from './ListGolongan';

export default function RiwayatGolongan() {
  const [riwayatDetail, setRiwayatDetail] = React.useState<RiwayatGolonganListData>();

  return (
    <>
      {typeof riwayatDetail === 'undefined' ? (
        <ListGolongan
          onShowDetail={(detail: RiwayatGolonganListData) => {
            setRiwayatDetail(detail);
          }}
        />
      ) : (
        <DetailGolongan
          detail={riwayatDetail}
          onBack={() => {
            setRiwayatDetail(undefined);
          }}
        />
      )}
    </>
  );
}
