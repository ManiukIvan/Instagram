export class NewPostData {
  message: string;
  description: string;
  images: File[];
  constructor(message: string, description: string, images: File[]) {
    this.message = message;
    this.description = description;
    this.images = images;
  }
}
