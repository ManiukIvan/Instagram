import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
  constructor() {
    this.registerForm = new FormGroup({
      login: new FormControl('', [ Validators.required, Validators.email]),
      fullName: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
      username: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    }, MustMatch('password', 'confirmPassword')
    );
    this.hidePassword = true;
    this.hideConfirmPassword = true;
  }
  ngOnInit(): void {
  }

  changeHidePasswordValue() {
    this.hidePassword = !this.hidePassword;
  }

  changeHideConfirmPasswordValue() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
  signIn() {
    console.log(this.registerForm);
  }

}

function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

