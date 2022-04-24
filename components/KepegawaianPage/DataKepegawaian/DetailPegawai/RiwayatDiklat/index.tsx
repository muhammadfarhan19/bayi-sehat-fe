import React from 'react';

import DetailDiklat from './DetailDiklat';
import ListDiklat from './ListDiklat';

export default function RiwayatDiklat() {
  const [riwayatDiklatId, setRiwayatDiklatId] = React.useState(0);
  return (
    <>
      {riwayatDiklatId === 0 ? (
        <ListDiklat
          onShowDetail={(id: number) => {
            setRiwayatDiklatId(id);
          }}
        />
      ) : (
        <DetailDiklat
          riwayatDiklatId={riwayatDiklatId}
          onBack={() => {
            setRiwayatDiklatId(0);
          }}
        />
      )}
    </>
  );
}
