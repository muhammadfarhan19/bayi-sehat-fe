import { AuthAPI } from '../../../constants/APIUrls';
import { AuthInfoData } from '../../../types/api/AuthAPI';
import { getQueryString } from '../../../utils/URLUtils';
import useCommonApi from './useCommonApi';

function useCheckUserAuth({ queryStringKey }: { queryStringKey?: string }) {
  const { data } = useCommonApi<null, AuthInfoData>(AuthAPI.GET_AUTH_INFO, null, { method: 'GET' });

  /**
   * Admin using query string to populate data, current user using token instead
   */
  const qs = getQueryString();
  const isAdmin = typeof qs?.[queryStringKey || ''] === 'string';

  return {
    checkCreator: (creator: string) => creator === `User ${data?.user_id}` || isAdmin,
  };
}

export default useCheckUserAuth;
