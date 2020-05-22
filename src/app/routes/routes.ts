import {LoginPageComponent} from '../pages/login-page/login-page.component';
import {SignupPageComponent} from '../pages/signup-page/signup-page.component';
import {UserPageComponent} from '../pages/user-page/user-page.component';
import {PostPageComponent} from '../pages/post-page/post-page.component';
import {AuthenticationService} from '../services/authentication.service';
import {PostsAllPageComponent} from '../pages/posts-all-page/posts-all-page.component';
import {PostsWithHashtagPageComponent} from '../pages/posts-with-hashtag-page/posts-with-hashtag-page.component';

export const Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent , canActivate: [AuthenticationService]},
  { path: 'signup', component: SignupPageComponent, canActivate: [AuthenticationService] },
  { path: 'users/:userName', component: UserPageComponent},
  { path: 'posts/all', component: PostsAllPageComponent},
  { path: 'posts/hashtags/:hashtagText', component: PostsWithHashtagPageComponent},
  { path: 'posts/:postId', component: PostPageComponent}
];
