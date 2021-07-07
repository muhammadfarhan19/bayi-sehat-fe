import { AlertAction } from '../action/ActionTypes';

const initialState = {
  open: false,
  status: false,
  title: '',
  subtitle: '',
};

export default function AlertReducer(state = initialState, action) {
  switch (action.type) {
    case AlertAction.SET_OPEN: {
      const newState = { ...state };
      newState.open = action.open;
      newState.status = action.status;
      newState.title = action.title;
      newState.subtitle = action.subtitle;
      return newState;
    }
    
    case AlertAction.SET_CLOSE: {
      const newState = { ...state };
      newState.open = action.open;
      newState.status = action.status;
      newState.title = action.title;
      newState.subtitle = action.subtitle;
      return newState;
    }
    default:
      return state;
  }
}
