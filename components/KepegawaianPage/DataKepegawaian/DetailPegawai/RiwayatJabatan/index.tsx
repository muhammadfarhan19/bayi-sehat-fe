import React from 'react';

import DetailJabatan from './DetailJabatan';
import ListJabatan from './ListJabatan';

export default function RiwayatDiklat() {
  const [riwayatJabatanId, setRiwayatJabatanId] = React.useState(0);
  return (
    <>
      {riwayatJabatanId === 0 ? (
        <ListJabatan
          onShowDetail={(id: number) => {
            setRiwayatJabatanId(id);
          }}
        />
      ) : (
        <DetailJabatan
          riwayatJabatanId={riwayatJabatanId}
          onBack={() => {
            setRiwayatJabatanId(0);
          }}
        />
      )}
    </>
  );
}
