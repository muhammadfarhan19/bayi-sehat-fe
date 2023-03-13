import React from 'react';

import { KepegawaianAPI } from '../../../constants/APIUrls';
import { DinasPegawaiKalenderData, GetDinasPegawaiKalenderReq } from '../../../types/api/KepegawaianAPI';
import useCommonApi from '../../shared/hooks/useCommonApi';
import RekapDetailAdmin from './RekapDetailAdmin';
import { SelectedData } from './RekapGroup';

interface RekapKehadiranPNSProps {
  pegawai_id: number;
  onBack: () => void;
  dateSelected: SelectedData;
}

function RekapKehadiranPNS(props: RekapKehadiranPNSProps) {
  const { pegawai_id, onBack, dateSelected } = props;
  const [detailRekap, setDetailRekap] = React.useState<DinasPegawaiKalenderData>();

  const { data: kalendarData } = useCommonApi<GetDinasPegawaiKalenderReq, DinasPegawaiKalenderData>(
    KepegawaianAPI.GET_DINAS_PEGAWAI_KALENDER_V2,
    {
      pegawai_id: pegawai_id,
      tgl_mulai: dateSelected?.dateStarted,
      tgl_selesai: dateSelected?.dateEnded,
    },
    { method: 'get' },
    { skipCall: !dateSelected.dateStarted || !pegawai_id || !dateSelected.dateEnded, revalidateOnMount: true }
  );

  React.useEffect(() => {
    if (kalendarData) {
      setDetailRekap(kalendarData);
    }
  }, [kalendarData]);

  return <RekapDetailAdmin detail={detailRekap} onBack={onBack} />;
}

export default RekapKehadiranPNS;
