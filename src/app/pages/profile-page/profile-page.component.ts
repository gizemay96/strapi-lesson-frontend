import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Tweet } from 'src/app/types/tweet.type';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  selectedFile: File;
  fileUrl: string | ArrayBuffer;

  constructor(
    private userService: UserService,
    private tweetService: TweetService,
    ) { }

  get user() {
    return this.userService.getUser();
  }

  get profileImg() {
    return this.user.profileImgURL;
  }

  get myTweets() {
    return this.userService.getMyTweets()
  }
  
  ngOnInit(): void { 
    this.userService.tryToLogin()
  }

  selectFile(event) {
    if (event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();

      reader.onload = e => {
        this.fileUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveImg() {
    this.userService.saveImg(this.selectedFile , this.fileUrl)
    .subscribe(response => 
        this.userService.editUser({profileImg: response[0]})
        .subscribe(response => {
          this.userService.getUserDetails();
          this.userService.fetcMyTweets();
        })
      )
  }

  likeTweet(myLike,tweetId){
    this.tweetService.toggleLike(myLike , tweetId , this.user.id)
    .subscribe(response => {
      this.userService.fetcMyTweets()  
    })
  }

  retweet(){
    console.log('retweet');
  }
}
