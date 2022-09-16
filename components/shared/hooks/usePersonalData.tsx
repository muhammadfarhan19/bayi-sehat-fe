import { UserAPI } from '../../../constants/APIUrls';
import {
  GetUserPersonalPegawaiData,
  GetUserPersonalPegawaiReq,
  GetUserProfileData,
  GetUserProfileReq,
} from '../../../types/api/UserAPI';
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
