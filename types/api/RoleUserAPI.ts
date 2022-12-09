export interface GetAdminList {
  user_id: number;
  pegawai_id: number;
  nip: string;
  name: string;
  jabatan_name: string;
  roles: [
    {
      role_id: number;
      role: string;
      is_active: boolean;
    }
  ];
}

export interface GetRBACRoles {
  role_id: number;
  role: string;
  is_active: boolean;
}

export interface PostRBACRolesReq {
  user_id: number;
  role_id: number;
}

export interface PostRBACRolesRes {
  status: string;
  data: string;
}
