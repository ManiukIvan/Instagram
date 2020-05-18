import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';

import { UserPageComponent } from './pages/user-page/user-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PostComponent } from './components/post/post.component';
import { UserComponent } from './components/user/user.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from './routes/routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoginPageComponent,
    SignupPageComponent,
    MenuComponent,
    UserPageComponent,
    PostComponent,
    UserComponent,
    PostPageComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
