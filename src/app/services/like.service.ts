import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../model/comment';
import {Like} from '../model/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }
  public getLikes(postId): Observable<number> {
    return this.http.get<number>('api/likes/' + postId);
  }

  public getLike(postId, userId): Observable<Like> {
    return this.http.get<Like>('api/likes/' + postId + '/' + userId);
  }

  public setLike(like): Observable<number> {
    return this.http.post<number>('api/likes/set', like);
  }
  public unsetLike(postId, userId): Observable<number> {
    return this.http.post<number>('api/likes/unset/' + postId, userId);
  }
}
