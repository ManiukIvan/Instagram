import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor() {
    this.user = {
      id: 1,
      username: 'Windstorm',
      fullName: 'Wind Storm Jr.',
      bio: '',
      postsAmount: 12,
      followersAmount: 10,
      followingAmount: 123,
    };
  }

  ngOnInit(): void {
  }

}
