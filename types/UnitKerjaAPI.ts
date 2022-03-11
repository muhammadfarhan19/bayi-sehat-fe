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
