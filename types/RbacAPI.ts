import { Action, Status } from './Common';

export interface AuthorizeData {
  user_id: number;
  resource_id: number;
  action: Action;
  is_authorized: boolean;
  error?: string;
}

export interface Role {
  role_id: number;
  role: string;
  is_active: boolean;
}

export interface Resource {
  resource_id: number;
  resource: string;
  is_active: boolean;
  is_resource_group: boolean;
}

export interface PostRbacAuthorizeReq {
  user_id: number;
  resource_id: number;
  action: Action;
}

export interface PostRbacAuthorizeRes {
  status: Status;
  data: AuthorizeData[] | null;
}

export interface PostRbacBulkAuthorizeReq {
  bulk_request: PostRbacAuthorizeReq[];
}

export interface PostRbacBulkAuthorizeRes {
  status: Status;
  data: AuthorizeData[] | null;
}

export interface GetRbacGetUserRolesReq {
  user_id: number;
}

export interface GetRbacGetUserRolesRes {
  status: Status;
  data: Role[] | null;
}

export interface GetRbacResourceGetParentReq {
  id: number;
}

export interface GetRbacResourceGetParentRes {
  status: Status;
  data: Resource[] | null;
}

export interface GetRbacResourceGetChildrenReq {
  id: number;
}

export interface GetRbacResourceGetChildrenRes {
  status: Status;
  data: Resource[] | null;
}
