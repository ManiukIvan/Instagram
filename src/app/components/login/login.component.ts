import {Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: any;
  loginForm: FormGroup;
  hide: boolean;
  constructor(private loginService: UserService, private localStorageService: LocalStorageService, private router: Router) {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]) ,
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
  public loginNow() {
    this.message = null;
    const resp = this.loginService.doLogin(this.loginForm.value);
    resp.subscribe((user: User) => {
      this.localStorageService.setUser(user);
      this.router.navigate(['/users', user.userName]);
    }, (e) => {
      this.message = null;
      if ( e.error.status === 'BAD_REQUEST') {// if Bad_Request show message
        this.message = e.error.message;
      }
    }, () => {}
    );
  }
}
