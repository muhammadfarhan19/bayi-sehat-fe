import React from 'react';

import DetailPenghargaan from './DetailPenghargaan';
import ListPenghargaan from './ListPenghargaan';

export default function RiwayatPenghargaan() {
  const [riwayatPenghargaanId, setRiwayatPenghargaanId] = React.useState(0);

  return (
    <>
      {riwayatPenghargaanId === 0 ? (
        <ListPenghargaan
          onShowDetail={(id: number) => {
            setRiwayatPenghargaanId(id);
          }}
        />
      ) : (
        <DetailPenghargaan riwayatPenghargaanId={riwayatPenghargaanId} onBack={() => setRiwayatPenghargaanId(0)} />
      )}
    </>
  );
}
