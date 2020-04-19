import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
  user: User;
  constructor() {
    this.user = {
      id: 1234,
      username: 'MindForage',
      fullName: 'Mind Forage Jr.',
      bio: 'Born to be free',
      postsAmount: 10,
      followersAmount: 13,
      followingAmount: 24,
    };
  }

  get postOrPosts() {
    if (this.user.postsAmount !== 1 ) {
      return 'posts';
    } else {
      return 'post';
    }
  }
  ngOnInit(): void {
  }

}
