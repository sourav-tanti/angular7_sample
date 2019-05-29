import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import * as appReducers from '../../store/app.reducers';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<appReducers.AppState>) { }

  ngOnInit() {
  }

  onSignUpSubmit(signupForm: NgForm) {
    const email = signupForm.value.email;
    const password = signupForm.value.password;
    this.store.dispatch(new authActions.TrySignup({ username: email, password: password }));
  }

}
