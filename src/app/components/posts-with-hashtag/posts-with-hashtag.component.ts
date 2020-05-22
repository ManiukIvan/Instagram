import { Component, OnInit } from '@angular/core';
import {KeyValue} from '@angular/common';
import {ImageService} from '../../services/image.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-posts-with-hashtag',
  templateUrl: './posts-with-hashtag.component.html',
  styleUrls: ['./posts-with-hashtag.component.css']
})
export class PostsWithHashtagComponent implements OnInit {
  errorMessage: string;
  postsImg: KeyValue<number, string>[];

  constructor(private imageService: ImageService,
              private route: ActivatedRoute) {
    this.postsImg = new Array();
  }

  ngOnInit(): void {
    const hashtagText = this.route.snapshot.paramMap.get('hashtagText');
    const respImg = this.imageService.getPostsImagesWithHashtag(hashtagText);
    respImg.subscribe((imgs: KeyValue<number, string>[]) => {
      if (imgs !== null) {
        this.postsImg = imgs;
      } else {
        this.errorMessage = 'There aren\'t posts with hashtags ' + hashtagText;
      }
    }, (error1) => {
      console.log(error1.error.message);
    });
  }
}
