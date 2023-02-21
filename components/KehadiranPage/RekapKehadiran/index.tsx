import React from 'react';

import { DinasPegawaiKalenderData } from '../../../types/api/KepegawaianAPI';
import RekapCalendar from './RekapCalendar';
import RekapDetail from './RekapDetail';

function RekapKehadiran() {
  const [detailRekap, setDetailRekap] = React.useState<DinasPegawaiKalenderData>();
  return (
    <>
      {typeof detailRekap === 'undefined' ? (
        <RekapCalendar onShowDetail={(detail: DinasPegawaiKalenderData) => setDetailRekap(detail)} />
      ) : (
        <RekapDetail
          detail={detailRekap}
          onBack={() => {
            setDetailRekap(undefined);
          }}
        />
      )}
    </>
  );
}

export default RekapKehadiran;
