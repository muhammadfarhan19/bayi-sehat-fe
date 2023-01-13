import React from 'react';

import KlaimDetail from './KlaimDetail';
import KlaimList from './KlaimList';

export default function KlaimCutiSakitAdmin() {
  const [klaimKehadiranId, setKlaimKehadiranId] = React.useState(0);

  return (
    <>
      {klaimKehadiranId === 0 ? (
        <KlaimList
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
