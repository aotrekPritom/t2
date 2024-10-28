import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';

import { auth } from '../../middlewares/auth';
import { CourseControllers } from './course.controller';
import { CourseValidationSchemas } from './course.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

// create course
router.post(
  '/create-course',
  auth(UserRole.TEACHER),
  validateRequest(CourseValidationSchemas.createCourseValidationSchema),
  CourseControllers.createCourse,
);

// Retrieve a list of all course.
router.get('/', CourseControllers.getAllCourse);
// get course by teacher
router.get('/teacher-courses',auth(UserRole.TEACHER,UserRole.ADMIN), CourseControllers.getCourseByTeacher);
// Retrieve a list of single course.
router.get(
  '/:id',
  auth(UserRole.TEACHER, UserRole.USER),
  CourseControllers.getSingleCourseById,
);
// enroll course
router.post(
  '/:courseId/enroll',
  auth(UserRole.USER),
  CourseControllers.enrolledCourse,
);

// get enrolled Courses By User
router.get(
  '/enrolled/courses',
  auth(UserRole.USER),
  CourseControllers.getEnrolledCoursesByUser,
);
// get enrolled Courses By User
router.get(
  '/enrolled/courses/enroll/:courseId',
  auth(UserRole.USER),
  CourseControllers.isEnrolledCourse,
);

export const CourseRoutes = router;
