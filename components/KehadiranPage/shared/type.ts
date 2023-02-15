export interface ModalProps {
  open: boolean;
  selectedId?: number;
  tanggal_klaim: string;
  jenis_pengajuan: string;
  user_id?: number;
  nama?: string;
  unitKerja?: string;
  alasan?: string;
  uuid?: string;
  docName?: string;
}

export interface ModalData {
  open: boolean;
  tanggal_klaim: string;
  jenis_pengajuan: string;
  user_id?: number;
  selectedId?: number;
  nama?: string;
  unitKerja?: string;
  alasan?: string;
  uuid?: string;
  docName?: string;
}
