import React from 'react';

import DetailKeluarga from './DetailKeluarga';
import ListKeluarga from './ListKeluarga';

export default function RiwayatKeluarga() {
  const [riwayatKeluargaId, setRiwayatKeluargaId] = React.useState(0);

  console.log(riwayatKeluargaId);

  return (
    <>
      {riwayatKeluargaId === 0 ? (
        <ListKeluarga
          onShowDetail={(id: number) => {
            setRiwayatKeluargaId(id);
          }}
        />
      ) : (
        <DetailKeluarga
          onShowDetail={(id: number) => {
            setRiwayatKeluargaId(id);
          }}
          riwayatKeluargaId={riwayatKeluargaId}
          onBack={() => setRiwayatKeluargaId(0)}
        />
      )}
    </>
  );
}
