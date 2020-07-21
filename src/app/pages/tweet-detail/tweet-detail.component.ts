import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/types/tweet.type';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/services/tweet.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss'],
})
export class TweetDetailComponent implements OnInit {
  tweet: Tweet;
  text: string = '';
  comments;
  isFormLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tweetService: TweetService,
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const tweetId: number = +this.route.snapshot.paramMap.get('id');

    this.tweetService
      .fetchTweet(tweetId)
      .subscribe((response: Tweet) => (this.tweet = response));

    this.commentService
      .fetchComments(tweetId)
      .subscribe((response: Comment[]) => (this.comments = response));
  }

  get user() {
    return this.userService.getUser();
  }

  sendComment() {
    this.isFormLoading = true;
    this.commentService
      .sendComment(this.text, this.tweet.id)
      .subscribe((response) => {
        this.text = '';
        this.isFormLoading = false;
        this.commentService
          .fetchComments(this.tweet.id)
          .subscribe((response: Comment[]) => (this.comments = response));
      });
  }

  likeTweet(myLike) {
    this.tweetService
      .toggleLike(myLike, this.tweet.id, this.user.id)
      .subscribe((response) => {
        this.tweetService
          .fetchTweet(this.tweet.id)
          .subscribe((response) => (this.tweet = response));
      });
  }

  retweet() {
    console.log('retweet');
  }

  likeComment(likeByMeComment, commentId) {
    this.commentService
      .toggleLike(likeByMeComment, commentId, this.tweet, this.user.id)
      .subscribe((response) => {
        //console.log(response);
        this.commentService
          .fetchComment(commentId)
          .subscribe((response: any) => {
            const newCom = response;
            const oldCom = this.comments.findIndex((c) => c.id === newCom.id);
            this.comments.splice(oldCom, 1, newCom);
            //console.log('select-com', newCom);
            console.log('my-com', oldCom);
            console.log('new-com', this.comments);
          });
      });
  }
  reComment() {
    console.log('recomment');
  }
}
