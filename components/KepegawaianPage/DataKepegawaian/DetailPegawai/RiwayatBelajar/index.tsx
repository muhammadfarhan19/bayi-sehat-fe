import React from 'react';

import DetailBelajar from './DetailBelajar';
import ListBelajar from './ListBelajar';

export default function RiwayatBelajar() {
  const [riwayatBelajarId, setRiwayatBelajarId] = React.useState(0);
  return (
    <>
      {riwayatBelajarId === 0 ? (
        <ListBelajar
          onShowDetail={(id: number) => {
            setRiwayatBelajarId(id);
          }}
        />
      ) : (
        <DetailBelajar
          riwayatBelajarId={riwayatBelajarId}
          onBack={() => {
            setRiwayatBelajarId(0);
          }}
        />
      )}
    </>
  );
}
