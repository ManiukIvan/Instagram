import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../model/post';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient ) { }
  public getPost(postId): Observable<Post> {
    return this.http.get<Post>('api/posts/' + postId);
  }
}
