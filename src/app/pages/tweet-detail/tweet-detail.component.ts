import { Component, OnInit} from '@angular/core';
import { Tweet } from 'src/app/types/tweet.type';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/services/tweet.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss']
})
export class TweetDetailComponent implements OnInit {
  tweet:Tweet;
  text:string = '';
  comments:Comment[];
  isFormLoading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetService,
    private commentService: CommentService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    const tweetId:number = +(this.route.snapshot.paramMap.get('id'));

    this.tweetService.fetchTweet(tweetId)
    .subscribe((response:Tweet) => this.tweet = response);

    this.commentService.fetchComments(tweetId)
    .subscribe((response:Comment[]) => this.comments = response)
    
  }

  get user() {
    return this.userService.getUser()
  }


  sendComment() {
    this.isFormLoading = true;
    this.commentService.sendComment(this.text , this.tweet.id)
    .subscribe(response => {
      this.text = '';
      this.isFormLoading = false;
      this.commentService.fetchComments(this.tweet.id)
      .subscribe((response:Comment[]) => this.comments = response)
    })
  }


}