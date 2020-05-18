import {UserRole} from './user-role';

export class User {
  id: number;
  login: string;
  password: string;
  userName: string;
  fullName: string;
  userRole: UserRole;
  avatarImageURL: string;
}
