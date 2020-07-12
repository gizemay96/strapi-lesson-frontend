import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../types/comment.type';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = 'http://localhost:1337/comments';

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  fetchComments(tweetId:number): Observable<any> {
    return this.http.get(`${this.baseUrl}?tweet=${tweetId}&&_sort=created_at:DESC`)
  }

  
  sendComment(text: string , tweetId:number) {
    const token = window.localStorage.getItem('token');
    const newComment = {
      text: text,
      user: this.userService.getUser().id,
      tweet: tweetId
    }

    return this.http.post(this.baseUrl, newComment , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  }

}


