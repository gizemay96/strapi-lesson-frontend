import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../types/tweet.type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text:string = '';
  isFormLoading = false;


  constructor(
    private tweetService: TweetService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.tweetService.fetchTweets()
  }
  get user() {
    return this.userService.getUser()
  }

  get tweets() {    
    return this.tweetService.getTweets()
  }

  sendTweet() {
    this.isFormLoading = true;
    this.tweetService.sendTweet(this.text)
    .subscribe(response => {
      this.text = '';
      this.isFormLoading = false;
      this.tweetService.fetchTweets()
    })
  }



}
