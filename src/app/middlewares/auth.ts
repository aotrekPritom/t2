import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import AppError from '../errors/AppError';
import { jwtHelpers } from '../utils/jwtHelpers';
import { Secret } from 'jsonwebtoken';

export const auth = (...roles: string[]) => {
  return async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    // console.log(roles);
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      const decode = jwtHelpers.verifyToken(
        token,
        config.access_token_secret as Secret,
      );
      // console.log(decode);
      if (roles.length && !roles.includes(decode.role as string)) {
        throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
      }
      req.user = decode;
      next();
    } catch (err) {
      next(err);
    }
  };
};
