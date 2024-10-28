import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

// login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);
  console.log(req.body)
  const { accessToken, refreshToken, userData } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
