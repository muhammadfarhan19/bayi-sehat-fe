import React from 'react';

import KlaimAdmin from './KlaimAdmin';
import KlaimDetail from './KlaimDetail';

export default function RiwayatPenghargaan() {
  const [klaimKehadiranId, setKlaimKehadiranId] = React.useState(0);

  return (
    <>
      {klaimKehadiranId === 0 ? (
        <KlaimAdmin
          onShowDetail={(id: number) => {
            setKlaimKehadiranId(id);
          }}
        />
      ) : (
        <KlaimDetail klaimDetailId={klaimKehadiranId} onBack={() => setKlaimKehadiranId(0)} />
      )}
    </>
  );
}
