
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import * as appReducers from '../store/app.reducers';
import * as authReducers from '../auth/store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<appReducers.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.store.select('auth').take(1).map(
      (authState: authReducers.State) => {
        return authState.isAuthenticated;
      }
    );
  }
}
