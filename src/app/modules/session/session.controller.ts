import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { SessionServices } from './session.service';

// const createSession = catchAsync(async (req, res) => {
//   const { courseId } = req.params;
//   const result = await SessionServices.createSession(req.body, courseId);
//   sendResponse(res, {
//     statusCode: httpStatus.CREATED,
//     success: true,
//     message: 'Session creates successfully',
//     data: result,
//   });
// });
const getSessionDetails = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  const { id: studentId } = req.user;
  const result = await SessionServices.getSessionDetails(sessionId, studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session retrieved successfully',
    data: result,
  });
});
const scheduleSession = catchAsync(async (req, res) => {
  const { startTime, endTime, channelName } = req.body;
  const { courseId } = req.params;
  const { id } = req.user;
  // console.log(req.body);
  const result = await SessionServices.scheduleSession(
    courseId,
    startTime,
    endTime,
    channelName,
    id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Session retrieved successfully',
    data: result,
  });
});

export const SessionControllers = {
  // createSession,
  getSessionDetails,
  scheduleSession,
};
