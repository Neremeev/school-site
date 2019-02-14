

import {USER_ACTION} from "../actions/user.action";

const initialState = {
  user: {}
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTION.LOAD_PROFILE:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}