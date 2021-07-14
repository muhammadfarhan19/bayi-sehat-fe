import { ModuleAction } from '../action/ActionTypes';

const initialState = {
  module : []
};

export default function ModuleReducer(state = initialState, action) {
  switch (action.type) {
    case ModuleAction.SET_MODULE: {
      const newState = { ...state };
      newState.module = action.module;
      return newState;
    }
    
    default:
      return state;
  }
}
