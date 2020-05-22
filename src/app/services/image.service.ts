import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {Observable} from 'rxjs';
import {KeyValue} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private localeStorageService: LocalStorageService) { }
  public changeUserPhoto(photo, userId): Observable<string> {
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', photo, photo.name);
    return this.http.post('api/images/changeProfileImage/' + userId, uploadImageData, { responseType: 'text' });
  }

  public getPostImages(userId, postId): Observable<string[]> {
    return this.http.get<string[]>('api/images/' + userId + '/' + postId + '/urls');
  }

  public getUserPostsImages(userId): Observable<KeyValue<number, string>[]> {
    return this.http.get< KeyValue<number, string>[]>('api/images/posts/' + userId);
  }

  public getAllPostsImages(start, amount): Observable<KeyValue<number, string>[]> {
    return this.http.get< KeyValue<number, string>[]>('api/images/posts/limit/' + start + '/' + amount);
  }

  public getPostsImagesWithHashtag(hashtagText): Observable<KeyValue<number, string>[]> {
    return this.http.get< KeyValue<number, string>[]>('api/images/posts/hashtags/' + hashtagText);
  }
}
