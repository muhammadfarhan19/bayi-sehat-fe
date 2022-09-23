import React from 'react';

import KlaimAdmin from './KlaimAdmin';
import KlaimDetail from './KlaimDetail';

export default function RiwayatPenghargaan() {
  const [riwayatPenghargaanId, setRiwayatPenghargaanId] = React.useState(0);

  return (
    <>
      {riwayatPenghargaanId === 0 ? (
        <KlaimAdmin
          onShowDetail={(id: number) => {
            setRiwayatPenghargaanId(id);
          }}
        />
      ) : (
        <KlaimDetail klaimDetailId={riwayatPenghargaanId} onBack={() => setRiwayatPenghargaanId(0)} />
      )}
    </>
  );
}
