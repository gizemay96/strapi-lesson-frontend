import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../types/comment.type';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  fetchComments(tweetId:number): Observable<any> {
    return this.http.get(`${env.commentsApiURL}?tweet=${tweetId}&&_sort=created_at:DESC`)
  } 

  
  sendComment(text: string , tweetId:number) {
    const token = window.localStorage.getItem('token');
    const newComment = {
      text: text,
      user: this.userService.getUser().id,
      tweet: tweetId
    }

    return this.http.post(env.commentsApiURL, newComment , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  }

}


