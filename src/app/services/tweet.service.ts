import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../types/tweet.type';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private tweets:Tweet[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  fetchTweets(): void {
    this.http.get(`${env.tweetsApiURL}?_sort=created_at:DESC`)
    .subscribe((response:Tweet[]) => this.tweets = response)
  }

  fetchTweet(tweetId:number): Observable<any> {
    return this.http.get(`${env.tweetsApiURL}/${tweetId}`)
  }

  getTweets():Tweet[] {
    return this.tweets;
  }

  sendTweet(text:string) {
    const token = window.localStorage.getItem('token');
    const newTweet = {
      text: text,
      user: this.userService.getUser().id
    }


   return this.http.post(env.tweetsApiURL,newTweet,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

}
