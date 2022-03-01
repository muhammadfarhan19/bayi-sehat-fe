import { CommonState } from '../reducer/CommonReducer';

export enum CommonActionType {
  SET_API_RES = 'SET_API_RES',
  SET_MODAL = 'SET_MODAL',
}

export const setAPIRes = (
  key: string,
  res: Object
): {
  type: CommonActionType.SET_API_RES;
  key: string;
  res: Object;
} => {
  return {
    type: CommonActionType.SET_API_RES,
    key,
    res,
  };
};

export const setModal = (
  modalProps: Partial<CommonState['modal']>
): {
  type: CommonActionType.SET_MODAL;
  modal: Partial<CommonState['modal']>;
} => {
  return {
    type: CommonActionType.SET_MODAL,
    modal: modalProps,
  };
};

export type CommonAction = ReturnType<typeof setAPIRes> | ReturnType<typeof setModal>;
