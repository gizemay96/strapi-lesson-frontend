import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user.type';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;

  constructor(private http: HttpClient) {}

  setUser(user: User = null) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    this.http
      .get(`${env.userApiURL}/me`, httpOptions)
      .subscribe((response: User) => {
        this.user = response;

        this.getUserDetails();
      });
  }

  getUserDetails() {
    const token = window.localStorage.getItem('token');
    if (!token) return;

    const httpOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    this.http
      .get(`${env.userApiURL}/${this.user.id}`, httpOptions)
      .subscribe((response: any) => {
        if (response.profileImg) {
          this.user.profileImgURL = `${env.baseApiURL}${response.profileImg.url}`;
        } else {
          this.user.profileImgURL = 'assets/avatar-placeholder.png';
        }
      });
  }

  saveImg(file, url) {
    const id = this.user.id.toString();
    const token = window.localStorage.getItem('token');
    const form = new FormData();

    form.append('files', file);
    // form.append('refId', id);
    // form.append('ref','user');
    // form.append('field', 'profileImg');

    return this.http.post(env.uploadApiURL, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  editUser(userData) {
    const token = window.localStorage.getItem('token');

    return this.http.put(`${env.userApiURL}/${this.user.id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
