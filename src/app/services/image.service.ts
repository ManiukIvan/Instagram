import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {User} from '../model/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private localeStorageService: LocalStorageService) { }
  public changeUserPhoto(photo, userId): Observable<string> {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', photo, photo.name);
    return this.http.post('api/images/users/changeProfileImage/' + userId, uploadImageData, { responseType: 'text' });
  }

  public getPostImages(postId): Observable<string[]> {
    return this.http.get<string[]>('api/images/posts/' + postId + '/names');
  }



}
