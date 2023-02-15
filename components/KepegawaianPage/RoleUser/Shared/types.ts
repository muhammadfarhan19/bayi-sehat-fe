export interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

export interface FormState {
  user_id: number;
  role_id: number;
}

export interface DialogConfirmation {
  message: string;
  label: string;
  onClose: () => void;
  onConfirm?: () => void;
  open: boolean;
  leftButtonTitle: string;
  rightButtonTitle: string;
  form?: string;
  buttonType: 'button' | 'submit' | 'reset';
}
