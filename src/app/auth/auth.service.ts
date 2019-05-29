import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as appReducers from '../store/app.reducers';
import * as authActions from '../auth/store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private store: Store<appReducers.AppState>
  ) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
      console.log('user signed up.');
      this.store.dispatch(new authActions.Signup());
      this.router.navigate(['/']);
      firebase.auth().currentUser.getIdToken().then(
        (token: string) => {
          this.store.dispatch(new authActions.SetToken(token));
        }
      );
    }).catch(error => {
      console.log(error);
    });
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
      console.log('user signed in');
      this.store.dispatch(new authActions.Signin());
      this.router.navigate(['/']);
      firebase.auth().currentUser.getIdToken().then(
        (token: string) => {
          this.store.dispatch(new authActions.SetToken(token));
        }
      );
    }).catch(error => {
      console.log(error);
    });
  }

  signoutUser() {
    firebase.auth().signOut();
    console.log('user signed out.');
    this.store.dispatch(new authActions.Signout());
    this.router.navigate(['/']);
  }
}
