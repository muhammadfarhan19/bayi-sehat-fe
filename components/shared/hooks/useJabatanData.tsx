import React from 'react';

import { JabatanAPI } from '../../../constants/APIUrls';
import { Status } from '../../../types/Common';
import { GetJabatanReq, GetJabatanRes, JabatanData } from '../../../types/JabatanAPI';
import { callAPI } from '../../../utils/Fetchers';

type ReturnHook = JabatanData | null;
type Req = GetJabatanReq;
type Res = GetJabatanRes;

export default function useJabatanData(apiReq: Req): ReturnHook {
  const [throwError, setThrowError] = React.useState<string>();
  const [data, setData] = React.useState<ReturnHook>(null);
  React.useEffect(() => {
    callAPI<Req | null, Res>(JabatanAPI.GET_JABATAN, apiReq, {
      method: 'GET',
    }).then(res => {
      if (res.status === 200 && res.data && res.data.status === Status.OK) {
        const apiRes = res.data.data;
        if (Object.keys(apiRes).length) {
          setData(apiRes);
        } else {
          setThrowError('Data not found');
          return;
        }
      }
    });
  }, [apiReq]);

  if (throwError) {
    throw throwError;
  }

  return data;
}
