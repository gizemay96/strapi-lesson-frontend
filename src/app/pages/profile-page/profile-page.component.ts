import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  selectedFile: File;
  fileUrl: string | ArrayBuffer;

  constructor(private userService: UserService) { }

  get user() {
    return this.userService.getUser();
  }

  get profileImg() {
    return this.user.profileImgURL;
  }
  ngOnInit(): void { }

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
          this.userService.getUserDetails()
        })
        
      )
  }
}
