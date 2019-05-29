import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignInSubmit(signinForm: NgForm) {
    const email = signinForm.value.email;
    const password = signinForm.value.password;
    this.authService.signinUser(email, password);
  }

}
