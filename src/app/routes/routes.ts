import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {SignupPageComponent} from '../pages/signup-page/signup-page.component';
import {UserPageComponent} from '../pages/user-page/user-page.component';
import {PostPageComponent} from '../pages/post-page/post-page.component';
import {AuthenticationService} from '../services/authentication.service';

export const Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent , canActivate: [AuthenticationService]},
  { path: 'signup', component: SignupPageComponent, canActivate: [AuthenticationService] },
  { path: 'users/:userName', component: UserPageComponent},
  { path: 'posts/:postId', component: PostPageComponent}
];
