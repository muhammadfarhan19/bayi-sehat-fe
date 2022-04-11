export type Action = 'read' | 'write';

export enum Status {
  BAD_REQUEST = 'BAD_REQUEST',
  ERROR_DB = 'ERROR_DB',
  OK = 'OK',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export enum StatusMenikah {
  MARRIED = 1,
  NOT_MARRIED = 2,
  DIVORCE = 3,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum StatusCpns {
  PNS = 1,
  PPNPN = 2,
}

export interface Pagination {
  total_data: number;
  total_page: number;
}

export enum DocumentUploadType {
  INTERNAL_SOURCE = 1,
  EXTERNAL_SOURCE = 2,
}
