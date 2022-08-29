import { useSelector, shallowEqual } from 'react-redux';
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
  userId: string;
  showProfPic: boolean;
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
  userId: '',
  showProfPic: false,
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
    case CommonActionType.SET_USER_INFO: {
      const newState = { ...state };
      newState.userId = action.userId;
      return newState;
    }
    case CommonActionType.SHOW_PROF_PIC: {
      const newState = { ...state };
      newState.showProfPic = action.show;
      return newState;
    }
    default:
      return state;
  }
}

export const useCommonState = () =>
  useSelector<{ common: CommonState }, CommonState>(state => state.common, shallowEqual);
