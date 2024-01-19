import bcrypt from 'bcryptjs';

export const comparePasswords = async (
  pwd: string,
  hashedPwd: string,
): Promise<boolean | void> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(bcrypt.compareSync(pwd, hashedPwd));
    } catch (e) {
      reject(e);
    }
  });
};
