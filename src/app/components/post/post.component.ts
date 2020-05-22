import {Component, OnInit, } from '@angular/core';
import {Post} from '../../model/post';
import {FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../services/post.service';
import {ImageService} from '../../services/image.service';
import {Comment} from '../../model/comment';
import {CommentService} from '../../services/comment.service';
import {LikeService} from '../../services/like.service';
import {LocalStorageService} from '../../services/local-storage.service';
import {Like} from '../../model/like';
import {_isNumberValue} from '@angular/cdk/coercion';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  errorMessage: string;
  isLiked: boolean;
  newComment: FormControl;
  post: Post;
  images: string[];
  comments: Comment[];
  likes: number;
  hrev: string;
  constructor(private route: ActivatedRoute,
              private localeStorageService: LocalStorageService,
              private postService: PostService,
              private imageService: ImageService,
              private commentService: CommentService,
              private likeService: LikeService) {
    this.newComment = new FormControl('', [Validators.required, Validators.maxLength(250)]);
    this.comments = new Array();
  }

  ngOnInit(): void {
    // getting post by id
    const postId = this.route.snapshot.paramMap.get('postId');
    if (_isNumberValue(postId)) {
      const respPost = this.postService.getPost(postId);
      respPost.subscribe((post: Post) => {
        this.post = post;
        const descriptionComment = new Comment();
        descriptionComment.postId = post.id;
        descriptionComment.text = post.description;
        descriptionComment.date = post.date;
        descriptionComment.ownerUserName = post.ownerUser.userName;
        descriptionComment.ownerImgUrl = post.ownerUser.avatarImageURL;
        // unshift will add post description in start of array
        this.comments.unshift(descriptionComment);

        const respImg = this.imageService.getPostImages(this.post.ownerUser.id, postId);
        respImg.subscribe((images: string[]) => {
          this.images = images;
        }, (error1) => {
          console.log(error1.error.message);
        });
      }, (error1) => {
        console.log(error1.error.message);
        this.errorMessage = 'Can\'t find such post';
      });

      const respComments = this.commentService.getComments(postId);
      respComments.subscribe((comments: Comment[]) => {
        this.comments = this.comments.concat(comments);
      }, (error1) => {
        console.log(error1.error.message);
      });

      const respLikes = this.likeService.getLikes(postId);
      respLikes.subscribe((likes: number) => {
        this.likes = likes;
      }, (error1) => {
        console.log(error1.error.message);
      });

      if (this.localeStorageService.isLogged()) {
        const respLike = this.likeService.getLike(postId, this.localeStorageService.getUserId());
        respLike.subscribe((like: Like) => {
          if (like !== null) {
            this.isLiked = true;
          } else {
            this.isLiked = false;
          }
        }, (error1) => {
          console.log(error1.error.message);
        });
      }

    } else {
      this.errorMessage = 'Post id is number value, ' + postId + ' isn\'t';
    }
  }


  liked() {
    if (this.isLogged()) {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        const like = new Like();
        like.date = new Date();
        like.idUser = this.localeStorageService.getUserId();
        like.idPost = this.post.id;
        const respLike = this.likeService.setLike(like);
        respLike.subscribe((likesAmount: number) => {
          this.likes = likesAmount;
        }, (error1) => {
          this.isLiked = !this.isLiked;
          console.log(error1.error.message);
        });
      } else {
        const respLike = this.likeService.unsetLike(this.post.id, this.localeStorageService.getUserId());
        respLike.subscribe((likesAmount: number) => {
          this.likes = likesAmount;
        }, (error1) => {
          this.isLiked = !this.isLiked;
          console.log(error1.error.message);
        });
      }
    }
  }

  addComment() {
    if (this.isLogged()) {
      const newComment = new Comment();
      newComment.text = this.newComment.value;
      newComment.date = new Date();
      newComment.postId = this.post.id;
      newComment.ownerUserName = this.localeStorageService.getUserName();
      newComment.ownerId = this.localeStorageService.getUserId();
      const resp = this.commentService.addComments(newComment);
      resp.subscribe((comment: Comment) => {
        this.comments.push(comment);
        this.newComment.setValue('');
      }, (error1) => {
        console.log(error1.error.message);
      });
    }

  }

  isLogged(): boolean {
    return this.localeStorageService.isLogged();
  }
}
