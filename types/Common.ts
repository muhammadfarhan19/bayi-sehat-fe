export type Action = 'read' | 'write';

export type AcceptedType = 'pdf' | 'jpg' | 'jpeg' | 'png' | 'csv';

export enum Status {
  BAD_REQUEST = 'BAD_REQUEST',
  ERROR_DB = 'ERROR_DB',
  OK = 'OK',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

export enum StatusMenikah {
  NOT_MARRIED = 1,
  MARRIED = 2,
  DIVORCE_ALIVE = 3,
  DIVORCE_DEATH = 4,
}

export enum Gender {
  MALE = 1,
  FEMALE = 2,
}

export enum Agama {
  BUDDHA = 1,
  HINDU = 2,
  ISLAM = 3,
  KATOLIK = 4,
  PROTESTAN = 5,
  OTHER = 0,
}

export enum StatusCpns {
  PNS = 1,
  PPNPN = 2,
  CPNS = 3,
}

export enum DocumentUploadType {
  INTERNAL_SOURCE = 1,
  EXTERNAL_SOURCE = 2,
}

export interface File {
  document_uuid: string;
  document_name: string;
}

export interface Pagination {
  total_data: number;
  total_page: number;
}

export interface DocumentFile {
  document_uuid: string;
  document_name: string;
}
