import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  public getComments(postId): Observable<Comment[]> {
    return this.http.get<Comment[]>('api/comments/' + postId);
  }

  public addComments(comment): Observable<Comment>  {
    return this.http.post<Comment>('api/comments/add', comment);
  }
}
