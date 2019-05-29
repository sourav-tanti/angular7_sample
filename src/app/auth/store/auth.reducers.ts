import * as authActions from './auth.actions';

export interface State {
    token: string;
    isAuthenticated: boolean;
}

const initialState: State = {
    token: null,
    isAuthenticated: false
};

export function authReducer(state = initialState, action: authActions.AuthActions) {
    switch(action.type) {
        case authActions.SIGN_UP:
        case authActions.SIGN_IN:
            return {
                ...state,
                isAuthenticated: true
            };
        case authActions.SIGN_OUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };
        case authActions.SET_TOKEN:
            return {
              ...state,
              token: action.payload
            };
        default:
            return {...state};
    }
}
