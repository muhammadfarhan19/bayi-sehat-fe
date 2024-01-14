import { UserAPI } from '../../../constants/APIUrls';
import {
  GetUserPersonalPegawaiData,
  GetUserPersonalPegawaiReq,
  GetUserPersonalPegawaiRes,
  GetUserProfileData,
  GetUserProfileReq,
} from '../../../types/api/UserAPI';
import { Status } from '../../../types/Common';
import { callAPI } from '../../../utils/Fetchers';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from './useCommonApi';

type ReturnResult = Partial<GetUserPersonalPegawaiData & GetUserProfileData>;

export default function usePersonalData(props?: { useQueryString?: boolean }): ReturnResult | null {
  const useQueryString = props?.useQueryString || true;
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  const apiReq = useQueryString && pegawai_id ? { pegawai_id: Number(pegawai_id) } : {};

  const { data: personalPegawai } = useCommonApi<GetUserPersonalPegawaiReq, GetUserPersonalPegawaiData>(
    UserAPI.GET_USER_PERSONAL_PEGAWAI,
    apiReq,
    { method: 'GET' }
  );

  const { data: userProfile } = useCommonApi<GetUserProfileReq, GetUserProfileData>(UserAPI.GET_USER_PROFILE, apiReq, {
    method: 'GET',
  });

  return { ...personalPegawai, ...userProfile };
}

export async function getPegawai():Promise<GetUserPersonalPegawaiData | undefined>{
  const PersonalPegRaw = await callAPI<GetUserPersonalPegawaiReq, GetUserPersonalPegawaiRes>(
    UserAPI.GET_USER_PERSONAL_PEGAWAI,
    {},
    { method: 'GET' }
  );

  if (PersonalPegRaw.status === 200 && PersonalPegRaw.data?.status === Status.OK) {
    return PersonalPegRaw.data.data
  } 
    return undefined
  
}
