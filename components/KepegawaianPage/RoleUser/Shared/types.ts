export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface FormState {
  name: string;
  nip: string;
  jabatan: number | string;
  user_id: number;
  role_id: number;
}

export interface DialogConfirmation {
  message: string;
  label: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
  leftButtonTitle: string;
  rightButtonTitle: string;
}
