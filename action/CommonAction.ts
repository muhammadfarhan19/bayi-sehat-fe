import { CommonState } from '../reducer/CommonReducer';

export const CommonActionType = {
  SET_API_RES: 'SET_API_RES',
  SET_MODAL: 'SET_MODAL',
  SET_SNACKBAR: 'SET_SNACKBAR',
  SET_USER_INFO: 'SET_USER_INFO',
  SHOW_PROF_PIC: 'SHOW_PROF_PIC',
} as const;

export const setAPIRes = (key: string, res: Object) => ({ type: CommonActionType.SET_API_RES, key, res });

export const setModal = (modalProps: Partial<CommonState['modal']>) => ({
  type: CommonActionType.SET_MODAL,
  modal: modalProps,
});

export const setSnackbar = (snackbarProps: Partial<CommonState['snackbar']>) => ({
  type: CommonActionType.SET_SNACKBAR,
  snackbar: snackbarProps,
});

export const setUserId = (userId: CommonState['userId']) => ({
  type: CommonActionType.SET_USER_INFO,
  userId: userId,
});

export const setShowProfPic = (show: boolean) => ({
  type: CommonActionType.SHOW_PROF_PIC,
  show,
});

export type CommonAction =
  | ReturnType<typeof setAPIRes>
  | ReturnType<typeof setModal>
  | ReturnType<typeof setSnackbar>
  | ReturnType<typeof setUserId>
  | ReturnType<typeof setShowProfPic>;
