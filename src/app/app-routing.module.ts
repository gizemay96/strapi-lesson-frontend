import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomeComponent } from './pages/home/home.component';
import { TweetDetailComponent } from './pages/tweet-detail/tweet-detail.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginPageComponent},
  {path:"register", component:RegisterPageComponent},
  {path:"profile", component:ProfilePageComponent},
  {path:"tweet/:id", component:TweetDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
