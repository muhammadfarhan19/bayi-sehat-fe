import { CommonAction, CommonActionType } from '../action/CommonAction';

export interface CommonState {
  apiRes: Record<string, object>;
  modal: {
    show: boolean;
    type: 'INFO' | 'WARNING' | 'ERROR';
    message: string;
  };
}

const initialState: CommonState = {
  apiRes: {},
  modal: {
    show: false,
    type: 'INFO',
    message: '',
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
    default:
      return state;
  }
}
