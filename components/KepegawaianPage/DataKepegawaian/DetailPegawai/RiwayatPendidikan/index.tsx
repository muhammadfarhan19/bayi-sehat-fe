import React from 'react';

import DetailPendidikan from './DetailPendidikan';
import ListPendidikan from './ListPendidikan';

export default function RiwayatPendidikan() {
  const [riwayatPendidikanId, setRiwayatPendidikanId] = React.useState(0);
  return (
    <>
      {riwayatPendidikanId === 0 ? (
        <ListPendidikan
          onShowDetail={(id: number) => {
            setRiwayatPendidikanId(id);
          }}
        />
      ) : (
        <DetailPendidikan
          riwayatPendidikanId={riwayatPendidikanId}
          onBack={() => {
            setRiwayatPendidikanId(0);
          }}
        />
      )}
    </>
  );
}
