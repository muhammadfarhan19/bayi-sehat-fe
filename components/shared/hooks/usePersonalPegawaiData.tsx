import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { setAPIRes } from '../../../action/CommonAction';
import { UserAPI } from '../../../constants/APIUrls';
import { CommonState } from '../../../reducer/CommonReducer';
import { Status } from '../../../types/Common';
import {
  GetUserPersonalPegawaiData,
  GetUserPersonalPegawaiReq,
  GetUserPersonalPegawaiRes,
} from '../../../types/UserAPI';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';

export default function usePersonalPegawaiData(): GetUserPersonalPegawaiData | null {
  const { userId } = getQueryString<{ userId?: string }>();
  const keyApiRes = [UserAPI.GET_USER_PERSONAL_PEGAWAI, JSON.stringify(userId)].join('-');

  const dispatch = useDispatch();
  const dataPersonalReduxState = useSelector<{ common: CommonState }>(state => {
    return state.common.apiRes[keyApiRes];
  }, shallowEqual) as GetUserPersonalPegawaiData;

  const [throwError, setThrowError] = React.useState<string>();
  const [dataPersonal, setDataPersonal] = React.useState<GetUserPersonalPegawaiData>(dataPersonalReduxState);
  React.useEffect(() => {
    if (!dataPersonal) {
      (async () => {
        const apiReq = userId ? { user_id: Number(userId) } : null;
        callAPI<GetUserPersonalPegawaiReq | null, GetUserPersonalPegawaiRes>(
          UserAPI.GET_USER_PERSONAL_PEGAWAI,
          apiReq,
          {
            method: 'GET',
          }
        ).then(res => {
          if (res.status === 200 && res.data && res.data.status === Status.OK) {
            const userPersonalPegawaiRes = res.data.data;
            if (Object.keys(userPersonalPegawaiRes).length) {
              dispatch(setAPIRes(keyApiRes, userPersonalPegawaiRes));
              setDataPersonal(userPersonalPegawaiRes);
            } else {
              setThrowError('Data not found');
            }
          }
        });
      })();
    }
  }, []);

  if (throwError) {
    throw throwError;
  }

  return dataPersonal;
}
