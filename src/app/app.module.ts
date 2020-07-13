import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomeComponent } from './pages/home/home.component';
import { TweetDetailComponent } from './pages/tweet-detail/tweet-detail.component';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomeComponent,
    TweetDetailComponent,
    TweetCardComponent,
    ProfilePageComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
