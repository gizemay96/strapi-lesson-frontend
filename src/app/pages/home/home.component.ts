import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../types/tweet.type';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  text: string = '';
  fileList = [];
  imgList = [];

  isFormLoading = false;

  constructor(
    private tweetService: TweetService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.tweetService.fetchTweets();
  }
  get user() {
    return this.userService.getUser();
  }

  get tweets() {
    return this.tweetService.getTweets();
  }

  sendTweet() {
    this.isFormLoading = true;

    if (!(this.fileList && this.fileList.length)) {
       this.tweetService
        .sendTweet(this.text, this.user)
        .subscribe((response) => {
          console.log('complete !!', response);

          this.text = '';
          this.isFormLoading = false;
          this.fileList = [];
          this.imgList = [];
          this.tweetService.fetchTweets();
        });
    } else {
      this.tweetService.uploadImages(this.fileList)
        .subscribe((response: any[]) => {
          const uploadedFileIds = response.map((file) => file.id);

          this.tweetService.sendTweet(this.text, this.user, uploadedFileIds)
            .subscribe((response) => {
              console.log('complete !!', response);

              this.text = '';
              this.isFormLoading = false;
              this.fileList = [];
              this.imgList = [];
              this.tweetService.fetchTweets();
            });
        });
    }
  }

  selectFiles(event) {
    this.fileList = Array.from(event.target.files);
    console.log(this.fileList);

    this.fileList.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => this.imgList.push(e.target.result);

      reader.readAsDataURL(file);
    });
    console.log(this.imgList);
  }
}
