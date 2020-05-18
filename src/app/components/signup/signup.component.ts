import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  message: any;
  registerForm: FormGroup;
  hidePassword: boolean;
  hideConfirmPassword: boolean;
  constructor(private registrationService: UserService, private localStorageService: LocalStorageService, private router: Router) {
    this.registerForm = new FormGroup({
      login: new FormControl('', [ Validators.required, Validators.email]),
      fullName: new FormControl('', [ Validators.required, Validators.maxLength(25)]),
      userName: new FormControl('', [ Validators.required, Validators.maxLength(25), Validators.pattern('^[\\w]*$')]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    }, MustMatch('password', 'confirmPassword')
    );
    this.hidePassword = true;
    this.hideConfirmPassword = true;
  }
  ngOnInit(): void {
  }

  public registerNow() {
    // clear field
    this.message = null;
    const resp = this.registrationService.doRegistration(this.registerForm.value);
    resp.subscribe((user: User) => {
      this.localStorageService.setUser(user);
      this.router.navigate(['/users', user.userName]);
    }, (e) => {
      this.message = null;
      if (e.error.status === 'BAD_REQUEST') {// if Bad_Request show message
        this.message = e.error.message;
      }
    });
  }

  changeHidePasswordValue() {
    this.hidePassword = !this.hidePassword;
  }

  changeHideConfirmPasswordValue() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}



// return null or set error if passwords don't match
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

