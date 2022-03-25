import { CommonAction, CommonActionType } from '../action/CommonAction';

export enum ModalType {
  INFO,
  WARNING,
  ERROR,
}

export enum SnackbarType {
  INFO,
  WARNING,
  ERROR,
}

export interface CommonState {
  apiRes: Record<string, object>;
  modal: {
    show: boolean;
    type: ModalType;
    message: string;
    redirect: string | null;
  };
  snackbar: {
    show: boolean;
    type: SnackbarType;
    message: string;
    timeout: number;
  };
}

const initialState: CommonState = {
  apiRes: {},
  modal: {
    show: false,
    type: ModalType.INFO,
    message: '',
    redirect: null,
  },
  snackbar: {
    show: false,
    type: SnackbarType.INFO,
    message: '',
    timeout: 3000, // 3 seconds
  },
};

export default function commonReducer(state = initialState, action: CommonAction) {
  switch (action.type) {
    case CommonActionType.SET_API_RES: {
      const newState = { ...state };
      newState.apiRes[action.key] = action.res;
      return newState;
    }
    case CommonActionType.SET_MODAL: {
      const newState = { ...state };
      newState.modal = {
        ...state.modal,
        ...action.modal,
      };
      return newState;
    }
    case CommonActionType.SET_SNACKBAR: {
      const newState = { ...state };
      newState.snackbar = {
        ...state.snackbar,
        ...action.snackbar,
      };
      return newState;
    }
    default:
      return state;
  }
}
