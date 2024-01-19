import { StatusCodeEnums } from '../enums/StatusCode.enums';
import { UserRoles } from '../enums/UserRoles.enums';
import { LoginInputs, RegisterInputs } from '../interfaces/Auth.interface';
import UserModel from '../models/User.model';
import { comparePasswords } from '../utils/comparePasswords';
import { generateJWT } from '../utils/generateJWT';
import { hashPassword } from '../utils/hashPassword';
import { failure, ok } from '../utils/responses';

export const AuthService = {
  register: async (payload: RegisterInputs) => {
    const { username, email, password, date_of_birth } = payload;

    const userExists = await UserModel.query().findOne({ email });

    if (userExists) {
      return failure('This user already exists', StatusCodeEnums.USER_EXISTS);
    }

    const hashedPassword = await hashPassword(password);

    const insertUser = await UserModel.query().insert({
      username,
      email,
      password: hashedPassword,
      date_of_birth,
      role: UserRoles.USER,
    });

    return ok({ token: generateJWT(insertUser) });
  },

  login: async (payload: LoginInputs) => {
    const { username, password } = payload;

    // Check if user with this username exists
    const user = await UserModel.query().findOne({ username });

    if (!user) {
      return failure(
        'User not found!',
        StatusCodeEnums.INVALID_CREDENTIALS,
        404,
      );
    }

    // Check if password matches
    const match = await comparePasswords(password, user.password);

    if (!match)
      return failure(
        'Invalid Credentials!',
        StatusCodeEnums.INVALID_CREDENTIALS,
        401,
      );

    // return the generated token
    return ok({ token: generateJWT(user) });
  },
};
