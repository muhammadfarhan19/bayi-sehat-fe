import React from 'react';

import usePersonalData from '../../shared/hooks/usePersonalData';
import KlaimAdmin from './KlaimAdmin';
import KlaimDetail from './KlaimDetail';

export default function RiwayatPenghargaan() {
  const personalPegawai = usePersonalData();
  const [klaimKehadiranId, setKlaimKehadiranId] = React.useState(0);

  if (!personalPegawai?.unit_kerja_id) {
    return <></>;
  }

  return (
    <>
      {klaimKehadiranId === 0 ? (
        <KlaimAdmin
          unit_kerja_id={personalPegawai?.unit_kerja_id}
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
