import React from 'react';

import DetailAnak from './DetailAnak';
import DetailKeluarga from './DetailKeluarga';
import ListKeluarga from './ListKeluarga';

export default function RiwayatKeluarga() {
  const [riwayatKeluargaId, setRiwayatKeluargaId] = React.useState(0);

  return (
    <>
      {riwayatKeluargaId === 0 ? (
        <ListKeluarga
          onShowDetail={(id: number) => {
            setRiwayatKeluargaId(id);
          }}
        />
      ) : riwayatKeluargaId === 2 ? (
        <DetailAnak riwayatAnakId={riwayatKeluargaId} onBack={() => setRiwayatKeluargaId(1)} />
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
