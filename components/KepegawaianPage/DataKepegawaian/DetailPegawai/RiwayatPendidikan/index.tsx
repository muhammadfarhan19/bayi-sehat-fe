import React from 'react';

import { AuthAPI } from '../../../../../constants/APIUrls';
import { AuthInfoData } from '../../../../../types/api/AuthAPI';
import useCommonApi from '../../../../shared/hooks/useCommonApi';
import Loader from '../../../../shared/Loader/Loader';
import DetailPendidikan from './DetailPendidikan';
import ListPendidikan from './ListPendidikan';

export default function RiwayatPendidikan() {
  const [riwayatPendidikanId, setRiwayatPendidikanId] = React.useState(0);
  const { data, isValidating } = useCommonApi<null, AuthInfoData>(AuthAPI.GET_AUTH_INFO, null, { method: 'GET' });

  if (isValidating) {
    return <Loader />;
  }

  return (
    <>
      {riwayatPendidikanId === 0 ? (
        <ListPendidikan
          userId={data?.user_id}
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
