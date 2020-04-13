import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;
  constructor() {
    this.loginForm = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.maxLength(25)]) ,
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      remember: new FormControl(false),
    });
    this.hide = true;
  }

  ngOnInit(): void {
  }

  changeHideValue() {
    this.hide = !this.hide;
  }
  // convenience getter for easy access to form fields
  get login() { return this.loginForm.controls; }
  save(): void {
    console.log(this.loginForm);
  }

}
