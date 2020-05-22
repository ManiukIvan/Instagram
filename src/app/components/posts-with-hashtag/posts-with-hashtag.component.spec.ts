import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {PostsWithHashtagPageComponent} from '../../pages/posts-with-hashtag-page/posts-with-hashtag-page.component';



describe('PostsWithHashtagComponent', () => {
  let component: PostsWithHashtagPageComponent;
  let fixture: ComponentFixture<PostsWithHashtagPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsWithHashtagPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsWithHashtagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
