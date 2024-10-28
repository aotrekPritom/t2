import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { pick } from '../../utils/pick';
import { CourseServices } from './course.service';

// create a new course
const createCourse = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await CourseServices.createCourse(req.body, id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

// // Retrieve a list of all course.
const getAllCourse = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'name']);
  // for pagination
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await CourseServices.getAllCourse(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

// get single Course
const getSingleCourseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieve successfully',
    data: result,
  });
});
// enrolledCourse
const enrolledCourse = catchAsync(async (req, res) => {
  const { id: studentId } = req.user;
  const { courseId } = req.params;
  const result = await CourseServices.enrolledCourse(courseId, studentId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course enrolled successfully',
    data: result,
  });
});
// enrolledCourse
const getEnrolledCoursesByUser = catchAsync(async (req, res) => {
  const { id: studentId } = req.user;
  // console.log(studentId, 'l');
  const result = await CourseServices.getEnrolledCoursesByUser(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses retrieve successfully',
    data: result,
  });
});
const isEnrolledCourse = catchAsync(async (req, res) => {
  const { id: studentId } = req.user;
  const { courseId } = req.params;
  // console.log(studentId, 'l');
  const result = await CourseServices.isEnrolledCourse(courseId,studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses retrieve successfully',
    data: result,
  });
});
const getCourseByTeacher = catchAsync(async (req, res) => {
  const { id: teacherId } = req.user;
  const result = await CourseServices.getCourseByTeacher(teacherId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'courses retrieve successfully',
    data: result,
  });
});



export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourseById,
  enrolledCourse,
  getEnrolledCoursesByUser,
  isEnrolledCourse,
  getCourseByTeacher
};
