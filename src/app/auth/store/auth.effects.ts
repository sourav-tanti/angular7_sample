import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.action$.pipe(
    ofType(authActions.TRY_SIGNUP),
    map((action: authActions.TrySignup) => {
      return action.payload;
    }).switchMap((authData: { username: string, password: string }) => {
      return fromPromise(
        firebase.auth().createUserWithEmailAndPassword(
          authData.username,
          authData.password
        )
      );
    }).switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    }).mergeMap(
      (token: string) => {
        return [
          {
            type: authActions.SIGN_UP
          },
          {
            type: authActions.SET_TOKEN,
            payload: token
          }
        ];
      }
    )
  );

  constructor(
    private action$: Actions
  ) {}
}
