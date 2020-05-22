import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../model/post';
import {Observable} from 'rxjs';
import {KeyValue} from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient ) { }
  public getPost(postId): Observable<Post> {
    return this.http.get<Post>('api/posts/' + postId);
  }
  public getPostsAmount(userId): Observable<number> {
    return this.http.get<number>('api/posts/amount/' + userId);
  }


  public addPost(post, images: File[] ): Observable<KeyValue<number, string>> {
    const uploadData = new FormData();
    const length = images.length;
    for (let x = 0; x < length; x++) {
      uploadData.append('images', images[x], images[x].name);
    }
    const postBlob = new Blob([JSON.stringify(post)], {type: 'application/json'});
    uploadData.append('post', postBlob);
    return this.http.post<KeyValue<number, string>>('api/posts/add' , uploadData);
  }
}
