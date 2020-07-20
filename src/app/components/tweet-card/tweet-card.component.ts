import { Component, OnInit , Input , Output , EventEmitter} from '@angular/core';
import { Tweet } from 'src/app/types/tweet.type';
import { Comment } from 'src/app/types/comment.type';
import { environment as env} from 'src/environments/environment';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {
  @Input() tweet:Tweet;
  @Input() comment:Comment;
  @Input() me: User;
  @Output() onLike = new EventEmitter();
  @Output() onRetweet = new EventEmitter();
  @Output() onComment = new EventEmitter();
 
  get avatarImg() {
    if(this.comment) {
    return this.comment.user.profileImg ?
    `${env.baseApiURL}${this.comment.user.profileImg.url}` :
    'assets/avatar-placeholder.png'
    } else {
    return this.tweet.user.profileImg ?
    `${env.baseApiURL}${this.tweet.user.profileImg.url}` :
    'assets/avatar-placeholder.png'
    }
  }

  get likeByMe() {
    if (this.me){
      return this.tweet.likes.find(like => like.user === this.me.id)
    }
  }

   
  constructor() { }

  ngOnInit(): void {
  }


}
