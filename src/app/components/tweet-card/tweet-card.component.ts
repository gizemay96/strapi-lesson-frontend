import { Component, OnInit , Input } from '@angular/core';
import { Tweet } from 'src/app/types/tweet.type';
import { Comment } from 'src/app/types/comment.type';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {

  @Input() tweet:Tweet;
  @Input() comment:Comment;

  constructor() { }

  ngOnInit(): void {
  }

}
