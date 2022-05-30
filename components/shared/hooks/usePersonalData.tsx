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

export default function usePersonalData(props?: { useQueryString?: boolean }): ReturnResult | null {
  const useQueryString = props?.useQueryString || true;
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const keyApiRes = [UserAPI.GET_USER_PERSONAL_PEGAWAI, UserAPI.GET_USER_PROFILE, JSON.stringify(pegawai_id)].join('_');

  const dispatch = useDispatch();
  const dataPersonalReduxState = useSelector<{ common: CommonState }>(state => {
    return state.common.apiRes[keyApiRes];
  }, shallowEqual) as ReturnResult;

  const [throwError, setThrowError] = React.useState<string>();
  const [dataPersonal, setDataPersonal] = React.useState<ReturnResult>(dataPersonalReduxState);
  React.useEffect(() => {
    if (!dataPersonal) {
      (() => {
        let apiReq = {};
        if (useQueryString) {
          apiReq = pegawai_id ? { pegawai_id: Number(pegawai_id) } : {};
        }

        callAPIParallel(() => [
          callAPI<GetUserProfileReq, GetUserProfileRes>(UserAPI.GET_USER_PROFILE, apiReq, { method: 'GET' }),
          callAPI<GetUserPersonalPegawaiReq, GetUserPersonalPegawaiRes>(UserAPI.GET_USER_PERSONAL_PEGAWAI, apiReq, {
            method: 'GET',
          }),
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
