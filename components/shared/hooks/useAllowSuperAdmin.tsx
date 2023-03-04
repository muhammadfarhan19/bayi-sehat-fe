import { RbacAPI, UserAPI } from '../../../constants/APIUrls';
import { Permissions } from '../../../constants/Permission';
import { AuthorizeData, PostRbacBulkAuthorizeReq } from '../../../types/api/RbacAPI';
import { GetUserProfileData, GetUserProfileReq } from '../../../types/api/UserAPI';
import useCommonApi from './useCommonApi';

function useAllowSuperAdmin() {
  const { data: userProfile, isValidating: userProfileLoading } = useCommonApi<GetUserProfileReq, GetUserProfileData>(
    UserAPI.GET_USER_PROFILE,
    {},
    { method: 'GET' }
  );

  const { data: rbac } = useCommonApi<PostRbacBulkAuthorizeReq, AuthorizeData[]>(
    RbacAPI.POST_RBAC_BULK_AUTHORIZE,
    {
      bulk_request: [
        { action: 'read', resource_id: Permissions.DROPDOWN_FILTER_UNIT_KERJA, user_id: userProfile?.user_id || 0 },
      ],
    },
    { method: 'POST' },
    { revalidateOnMount: true, skipCall: userProfileLoading }
  );

  const isAllowSuperAdminAccessFilter = !!rbac?.[0]?.is_authorized;

  return {
    isAllowSuperAdminAccessFilter,
  };
}

export default useAllowSuperAdmin;
