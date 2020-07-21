import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../types/comment.type';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment as env } from '../../environments/environment';
import { LikeService } from './like.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private likeService: LikeService
  ) {}

  fetchComments(tweetId: number): Observable<any> {
    return this.http.get(
      `${env.commentsApiURL}?tweet=${tweetId}&&_sort=created_at:DESC`
    );
  }

  fetchComment(commentId: number) {
    return this.http.get(`${env.commentsApiURL}/${commentId}`);
  }

  sendComment(text: string, tweetId: number) {
    const token = window.localStorage.getItem('token');
    const newComment = {
      text: text,
      user: this.userService.getUser().id,
      tweet: tweetId,
    };

    return this.http.post(env.commentsApiURL, newComment, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  toggleLike(likeByMeComment, commentId, tweetId, userId) {
    if (likeByMeComment) {
      return this.likeService.dislikeCom(likeByMeComment.id);
    } else {
      return this.likeService.likeComment(commentId, tweetId, userId);
    }
  }
}
