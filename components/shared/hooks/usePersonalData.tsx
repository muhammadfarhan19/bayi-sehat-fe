import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { setAPIRes } from '../../../action/CommonAction';
import { UserAPI } from '../../../constants/APIUrls';
import { CommonState } from '../../../reducer/CommonReducer';
import {
  GetUserPersonalPegawaiData,
  GetUserPersonalPegawaiReq,
  GetUserPersonalPegawaiRes,
  GetUserProfileData,
  GetUserProfileReq,
  GetUserProfileRes,
} from '../../../types/api/UserAPI';
import { Status } from '../../../types/Common';
import { callAPI, callAPIParallel } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';

type ReturnResult = Partial<GetUserPersonalPegawaiData & GetUserProfileData>;

export default function usePersonalData(): ReturnResult | null {
  const { userId } = getQueryString<{ userId?: string }>();
  const keyApiRes = [UserAPI.GET_USER_PERSONAL_PEGAWAI, UserAPI.GET_USER_PROFILE, JSON.stringify(userId)].join('_');

  const dispatch = useDispatch();
  const dataPersonalReduxState = useSelector<{ common: CommonState }>(state => {
    return state.common.apiRes[keyApiRes];
  }, shallowEqual) as ReturnResult;

  const [throwError, setThrowError] = React.useState<string>();
  const [dataPersonal, setDataPersonal] = React.useState<ReturnResult>(dataPersonalReduxState);
  React.useEffect(() => {
    if (!dataPersonal) {
      (() => {
        const apiReq = userId ? { user_id: Number(userId) } : null;

        callAPIParallel(() => [
          callAPI<GetUserProfileReq | null, GetUserProfileRes>(UserAPI.GET_USER_PROFILE, apiReq, { method: 'GET' }),
          callAPI<GetUserPersonalPegawaiReq | null, GetUserPersonalPegawaiRes>(
            UserAPI.GET_USER_PERSONAL_PEGAWAI,
            apiReq,
            { method: 'GET' }
          ),
        ]).then(res => {
          let userRes = {};
          if (res[0].status === 200 && res[0].data && res[0].data?.status === Status.OK) {
            userRes = { ...userRes, ...res[0].data.data };
          }
          if (res[1].status === 200 && res[1].data && res[1].data?.status === Status.OK) {
            userRes = { ...userRes, ...res[1].data.data };
          }

          if (!Object.keys(userRes).length) {
            setThrowError('Failed to fetch the data');
            return;
          }

          dispatch(setAPIRes(keyApiRes, userRes));
          setDataPersonal(userRes);
        });
      })();
    }
  }, []);

  if (throwError) {
    throw throwError;
  }

  return dataPersonal;
}
