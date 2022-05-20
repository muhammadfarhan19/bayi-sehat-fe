export type PostUnitKerjaInsertReq = {
  unit_kerja: string;
  parent_id: string;
};

export interface PostUnitKerjaInsertRes {
  status: string;
  data: {
    unit_kerja: string;
    parent_id: string;
  };
}

export interface GetUnitKerjaRes {
  status: string;
  data: GetUnitKerjaData[];
}

export interface GetUnitKerjaData {
  unit_kerja_id: string;
  name: string;
}
