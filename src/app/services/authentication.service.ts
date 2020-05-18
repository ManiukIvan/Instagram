import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  constructor(private localStorageService: LocalStorageService) { }

  canActivate() {
    return !this.localStorageService.isLogged();
  }

}
