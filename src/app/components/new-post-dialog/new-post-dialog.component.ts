import {Component} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {NewPostData} from '../../model/new-post-data';

@Component({
  selector: 'app-new-post-dialog',
  templateUrl: './new-post-dialog.component.html',
  styleUrls: ['./new-post-dialog.component.css']
})
export class NewPostDialogComponent {

  postDescription: FormControl;
  message: string;
  selectedFiles: File[];

  constructor(public dialogRef: MatDialogRef<NewPostDialogComponent>) {
    this.postDescription = new FormControl('', [Validators.required, Validators.maxLength(495)]);
    this.message = 'Images aren\'t chosen';
    this.selectedFiles = new Array();
  }

  onCancel(): void {
    this.dialogRef.close(new NewPostData('cancel', this.postDescription.value, this.selectedFiles));
  }
  onPost(): void {
      this.dialogRef.close(new NewPostData('post', this.postDescription.value, this.selectedFiles));
  }

  onImagesChanged(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length === 1) {
      this.message = this.selectedFiles[0].name;
    } else if (this.selectedFiles.length > 1) {
      this.message = 'Images amount: ' + this.selectedFiles.length.toString() ;
    } else {
      this.message = 'Images aren\'t chosen';
    }
  }

}
