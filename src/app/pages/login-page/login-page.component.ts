import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { AuthResponse } from '../../types/authResponse.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  isLoading: boolean = false;
  form = {
    identifier: '',
    password:''
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true,
    this.authService.login(this.form)
    .subscribe((response: AuthResponse) => {
      
      
      this.authService.setToken(response.jwt);
      this.userService.setUser(response.user);

      this.isLoading = false;

      this.form.identifier = '';
      this.form.password = '';

      this.router.navigateByUrl('/');
    })
  }

}
