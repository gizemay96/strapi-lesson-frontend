import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:1337/users'
  private user: User;

  constructor(
    private http: HttpClient
  ) { }

  setUser(user:User = null) {
    this.user = user
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const token = window.localStorage.getItem('token')
    if(!token) return;

     this.http.get(`${this.baseUrl}/me`,{
       headers:{
         Authorization:`Bearer ${token}`
       }
     })
     .subscribe((response: User) => {
       this.user = response
     })

  }
}
