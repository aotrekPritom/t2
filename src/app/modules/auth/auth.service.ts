import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { jwtHelpers } from '../../utils/jwtHelpers';
import prisma from '../../utils/prisma';
import { TLoginData } from './auth.interface';
import bcrypt from 'bcrypt';
// login
const login = async (payload: TLoginData) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!userData) {
    throw new AppError(404, 'User does not exist!');
  }

  console.log(userData);
  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    userData.password,
  );
  // console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password incorrect!');
  }
  const jwtPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
  };
  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expiresIn as string,
  );
  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.refresh_token_expiresIn as string,
  );

  return {
    accessToken,
    refreshToken,
    userData,
  };
};

export const AuthServices = {
  login,
};
