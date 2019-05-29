
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as appReducers from '../store/app.reducers';
import * as authReducers from '../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<appReducers.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Req Intercepted: ', req);
    return this.store.select('auth').take(1).switchMap( // take(1) will unsubscribe select() after 1 change detect
      (authState: authReducers.State) => {
        const copiedReq = req.clone({ params: req.params.set('auth', authState.token)})
        console.log('Updated Req: ', copiedReq);
        return next.handle(copiedReq); // it tells req to go forward
      }
    );
  }
}
