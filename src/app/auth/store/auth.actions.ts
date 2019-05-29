import {Action} from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { username: string, password: string }) {}
}

export class Signup implements Action {
    readonly type = SIGN_UP;
}

export class Signin implements Action {
    readonly type = SIGN_IN;
}

export class Signout implements Action {
    readonly type = SIGN_OUT;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Signout | SetToken | TrySignup;
