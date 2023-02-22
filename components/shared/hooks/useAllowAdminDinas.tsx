import { RbacAPI, UserAPI } from '../../../constants/APIUrls';
import { Permissions } from '../../../constants/Permission';
import { AuthorizeData, PostRbacBulkAuthorizeReq } from '../../../types/api/RbacAPI';
import { GetUserProfileData, GetUserProfileReq } from '../../../types/api/UserAPI';
import useCommonApi from './useCommonApi';

function useAllowAdminDinas() {
  const { data: userProfile, isValidating: userProfileLoading } = useCommonApi<GetUserProfileReq, GetUserProfileData>(
    UserAPI.GET_USER_PROFILE,
    {},
    { method: 'GET' }
  );

  const { data: rbac } = useCommonApi<PostRbacBulkAuthorizeReq, AuthorizeData[]>(
    RbacAPI.POST_RBAC_BULK_AUTHORIZE,
    {
      bulk_request: [
        { action: 'read', resource_id: Permissions.TOMBOL_TAMBAH_DINAS, user_id: userProfile?.user_id || 0 },
        { action: 'read', resource_id: Permissions.TOMBOL_EDIT_DINAS, user_id: userProfile?.user_id || 0 },
        {
          action: 'read',
          resource_id: Permissions.RESOURCE_GROUP_AKSES_PENUH_DINAS,
          user_id: userProfile?.user_id || 0,
        },
      ],
    },
    { method: 'POST' },
    { revalidateOnMount: true, skipCall: userProfileLoading }
  );

  const isAllowDinasAdd = !!rbac?.[0]?.is_authorized;
  const isAllowDinasEdit = !!rbac?.[1]?.is_authorized;
  const isAllowDinasFullAccessMenu = !!rbac?.[2]?.is_authorized;

  return {
    isAllowDinasAdd,
    isAllowDinasEdit,
    isAllowDinasFullAccessMenu,
  };
}

export default useAllowAdminDinas;
