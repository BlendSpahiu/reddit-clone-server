import { Model } from 'objection';
import { UserRoles } from '../enums/UserRoles.enums';

export default class UserModel extends Model {
  id!: string;
  email!: string;
  username!: string;
  password!: string;
  role!: UserRoles;
  date_of_birth!: string;
  created_at!: Date;
  update_at!: Date;

  static get tableName() {
    return 'users';
  }
}
