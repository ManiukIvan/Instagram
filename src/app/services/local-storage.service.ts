import { Injectable } from '@angular/core';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  user: User;
  constructor() { }
  public getUserName(): string {
    return localStorage.getItem('userName');
  }
  public getUserId(): number {
    return Number(localStorage.getItem('userId'));
  }
  public getUserRole(): string {
    return localStorage.getItem('userRole');
  }
  public setUser(user: User) {
    localStorage.setItem('userId', String(user.id));
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('userRole', user.userRole.role);
  }
  public removeUser() {
    localStorage.clear();
  }
  public isLogged() {
    if (this.getUserName() != null) {
      return true;
    } else {
      return false;
    }
  }
}
