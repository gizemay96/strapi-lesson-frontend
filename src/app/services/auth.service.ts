import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  register (registerData) {
   return this.http.post(`${env.authApiURL}/local/register`, registerData)
  }

  logout() {
    window.localStorage.removeItem('token')
    this.userService.setUser()
  }

  setToken(token: string) {
    window.localStorage.setItem("token",token)
  }

  login(loginData) {
    return this.http.post(`${env.authApiURL}/local`, loginData)
  }
  
}
