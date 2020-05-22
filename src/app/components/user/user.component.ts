import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {ImageService} from '../../services/image.service';
import {KeyValue} from '@angular/common';
import {PostService} from '../../services/post.service';
import {MatDialog} from '@angular/material/dialog';
import {NewPostDialogComponent} from '../new-post-dialog/new-post-dialog.component';
import {error} from 'selenium-webdriver';
import {NewPostData} from '../../model/new-post-data';
import {Post} from '../../model/post';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  errorMessage: string;
  user: User;
  postAmount: number;
  postsImg: KeyValue<number, string>[];

  constructor(private userService: UserService,
              private localeStorageService: LocalStorageService,
              private imageService: ImageService,
              private postService: PostService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
    this.user = null;
    this.postsImg = new Array();

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.split('/')[1] === 'users') {
          this.ngOnInit();
        }
      }
    });
  }

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('userName');
    const resp = this.userService.getUser(userName);
    resp.subscribe((user: User) => {
      this.user = user;

      const respImg = this.imageService.getUserPostsImages(this.user.id);
      respImg.subscribe((imgs: KeyValue<number, string>[]) => {
        this.postsImg = imgs;
      }, (error1) => {
        console.log(error1);
      });

      const respPostAmount = this.postService.getPostsAmount(this.user.id);
      respPostAmount.subscribe((amount: number) => {
        this.postAmount = amount;
      }, (error1) => {
        console.log(error1);
      });

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
    return this.user.userName === this.localeStorageService.getUserName();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPostDialogComponent);

    dialogRef.afterClosed().subscribe((result: NewPostData) => {
      if (result.message === 'cancel') {
        console.log('cancel');
      } else if (result.message === 'post') {
        console.log('post');
        const post = new Post();
        post.description = result.description;
        post.date = new Date();
        post.ownerUser = this.user;
        const resp = this.postService.addPost(post, result.images);
        resp.subscribe((img: KeyValue<number, string>) => {
          this.postsImg.unshift(img);
        } , (error1 => {
            console.log(error1);
        }));
      }
    }, (error1) => {
      console.log(this.errorMessage);
    });
  }
}
