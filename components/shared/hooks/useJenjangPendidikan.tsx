import { MasterAPI } from '../../../constants/APIUrls';
import { JenjangPendidikan } from '../../../constants/Resource';
import { PendidikanEligibleJenjangData } from '../../../types/api/MasterAPI';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from './useCommonApi';

function useJenjangPendidikan() {
  const { pegawai_id } = getQueryString<{ pegawai_id?: string }>();
  if (!pegawai_id) {
    const { data: eligibleJenjangPendidikan } = useCommonApi<null, PendidikanEligibleJenjangData[]>(
      MasterAPI.GET_PENDIDIKAN_ELIGIBLE_JENJANG,
      null,
      { method: 'GET' }
    );
    return eligibleJenjangPendidikan;
  }

  return JenjangPendidikan;
}

export default useJenjangPendidikan;
