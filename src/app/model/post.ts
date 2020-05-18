import {User} from './user';


export class Post {
  id: number;
  description: string;
  date: Date;
  ownerUser: User;
}
