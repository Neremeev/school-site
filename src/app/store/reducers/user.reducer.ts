

import {USER_ACTION} from "../actions/user.action";

const initialState = {
  user: {},
  groupsList: [],
  myGroupsList: []
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTION.LOAD_PROFILE:
      return {
        ...state,
        user: action.payload
      };

    case USER_ACTION.LOAD_GROUPS_LIST:
      return {
        ...state,
        groupsList: action.payload
      };

    case USER_ACTION.LOAD_MY_GROUPS_LIST:
      return {
        ...state,
        myGroupsList: action.payload
      };

    default:
      return state;
  }
}