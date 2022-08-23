import React from 'react';

import RiwayatKGBDetail from './RiwayatKGBDetail';
import RiwayatKGBList from './RiwayatKGBList';

function RiwayatKGB() {
  const [riwayatKGBId, setRiwayatKGBId] = React.useState(0);
  return (
    <>
      {riwayatKGBId === 0 ? (
        <RiwayatKGBList
          onShowDetail={(id: number) => {
            setRiwayatKGBId(id);
          }}
        />
      ) : (
        <RiwayatKGBDetail riwayatKGBId={riwayatKGBId} onBack={() => setRiwayatKGBId(0)} />
      )}
    </>
  );
}

export default RiwayatKGB;
