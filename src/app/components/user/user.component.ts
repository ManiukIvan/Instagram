import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {ImageService} from '../../services/image.service';
import {error} from 'selenium-webdriver';
import {log} from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  errorMessage: string;
  user: User;
  postImg: string[];
  constructor(private userService: UserService,
              private localeStorageService: LocalStorageService,
              private imageService: ImageService,
              private route: ActivatedRoute) {
    this.user = null;
    this.postImg = new Array();
  }

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('userName');
    const resp = this.userService.getUser(userName);
    resp.subscribe((user: User) => {
      this.user = user;
      }, (error1) => {
      this.errorMessage = error1.error.message;
    });

    const respImg = this.imageService.getUserPostImages(userName);
    resp.subscribe((user: User) => {
      this.user = user;
    }, (error1) => {
      this.errorMessage = error1.error.message;
    });


  }

  onProfilePhotoChanged(event) {
      const selectedFile = event.target.files[0];
      if (selectedFile !== null && selectedFile !== undefined) {
        const resp = this.imageService.changeUserPhoto(selectedFile, this.user.id);
        resp.subscribe((mess: string) => {
          this.user.avatarImageURL += '?' + selectedFile.name;
        }, (error1) => {
         const message = error1.error;
         console.log(message);
        });
      }
  }
  isUserOwnComponent(): boolean {
    return  this.user.userName === this.localeStorageService.getUserName();
  }
}
