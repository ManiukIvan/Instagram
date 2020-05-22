import { Component, OnInit } from '@angular/core';
import {KeyValue} from '@angular/common';
import {ImageService} from '../../services/image.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-posts-all',
  templateUrl: './posts-all.component.html',
  styleUrls: ['./posts-all.component.css']
})
export class PostsAllComponent implements OnInit {


  postsImg: KeyValue<number, string>[];
  // if threre is no posts on bac(all posts are loaded)
  allPostsLoaded: boolean;
  canScroll: boolean;
  constructor(private imageService: ImageService, private spinner: NgxSpinnerService) {
    this.postsImg = new Array();
    this.canScroll = true;
    this.allPostsLoaded = false;
  }

  ngOnInit(): void {
    const respImg = this.imageService.getAllPostsImages(0, 9);
    respImg.subscribe((imgs: KeyValue<number, string>[]) => {
      this.postsImg = imgs;
    }, (error1) => {
      console.log(error1.error.message);
    });
  }
  onScroll() {
    if (this.canScroll && !this.allPostsLoaded) {
      this.spinner.show();
      console.log('scrolling');
      this.canScroll = false;
      this.loadNextPosts();
    }
  }

  loadNextPosts() {
    const respImg = this.imageService.getAllPostsImages(this.postsImg.length - 1, 9);
    respImg.subscribe((imgs: KeyValue<number, string>[]) => {
      if (imgs != null && imgs.length > 0) {
        this.postsImg = this.postsImg.concat(imgs);
      } else {
        this.allPostsLoaded = true;
      }
      this.spinner.hide();
      this.canScroll = true;
    }, (error1) => {
      console.log(error1.error.message);
    });
  }
}
