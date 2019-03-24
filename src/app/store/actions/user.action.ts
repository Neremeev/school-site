import {Action} from '@ngrx/store';

export namespace USER_ACTION {
  export const LOAD_PROFILE = 'LOAD_PROFILE';
  export const LOAD_GROUPS_LIST = 'LOAD_GROUPS_LIST';
  export const LOAD_MY_GROUPS_LIST = 'LOAD_MY_GROUPS_LIST';
}

export class LoadProfile implements Action {
  readonly type = USER_ACTION.LOAD_PROFILE;
  constructor(public payload) {}
}

export class LoadGroupsList implements Action {
  readonly type = USER_ACTION.LOAD_GROUPS_LIST;
  constructor(public payload) {}
}

export class LoadMyGroups implements Action {
  readonly type = USER_ACTION.LOAD_MY_GROUPS_LIST;
  constructor(public payload) {}
}

export type UserAction = LoadProfile | LoadGroupsList