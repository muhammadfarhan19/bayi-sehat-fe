import React from 'react';

import { AuthAPI } from '../../../../../constants/APIUrls';
import { AuthInfoData } from '../../../../../types/api/AuthAPI';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import Loader from '../../../../shared/Loader/Loader';
import DetailPengangkatan from './DetailPengangkatan';
import ListPengangkatan from './ListPengangkatan';

export default function RiwayatPengangkatan() {
  const [riwayatId, setRiwayatId] = React.useState(0);
  const { data, isValidating } = useCommonApi<null, AuthInfoData>(AuthAPI.GET_AUTH_INFO, null, { method: 'GET' });

  if (isValidating) {
    return <Loader />;
  }

  return (
    <>
      {riwayatId === 0 ? (
        <ListPengangkatan
          userId={data?.user_id}
          onShowDetail={(id: number) => {
            setRiwayatId(id);
          }}
        />
      ) : (
        <DetailPengangkatan
          riwayatId={riwayatId}
          onBack={() => {
            setRiwayatId(0);
          }}
        />
      )}
    </>
  );
}
