import {Action} from '@ngrx/store';

export namespace USER_ACTION {
  export const LOAD_PROFILE = 'LOAD_PROFILE';
}

export class LoadProfile implements Action {
  readonly type = USER_ACTION.LOAD_PROFILE;
  constructor(public payload) {}
}

export type UserAction = LoadProfile