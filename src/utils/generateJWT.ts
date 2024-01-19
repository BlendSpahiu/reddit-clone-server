import jwt, { Algorithm } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import UserModel from '../models/User.model';
import { UserRoles } from '../enums/UserRoles.enums';

export const generateJWT = (user: UserModel) => {
  return jwt.sign(
    {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [
          UserRoles.USER,
          UserRoles.ADMIN,
          UserRoles.OWNER,
        ],
        'x-hasura-default-role': UserRoles.USER,
        'x-hasura-user-id': user.id,
        'x-hasura-role': UserRoles.USER,
      },
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: JWT_ALGORITHM as Algorithm,
    },
  );
};
