import * as slReducers from '../shopping-list/store/shopping-list.reducers';
import * as authReducers from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: slReducers.State,
    auth: authReducers.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: slReducers.shoppingListReducer,
    auth: authReducers.authReducer
};