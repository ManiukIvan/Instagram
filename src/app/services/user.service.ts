import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public doRegistration(user): Observable<User> {
    return this.http.post<User>('api/register', user);
  }

  public doLogin(user): Observable<User> {
    return this.http.post<User>('api/login', user);
  }

  public getUser(userName): Observable<User> {
    return this.http.get<User>('api/users/' + userName);
  }
}
