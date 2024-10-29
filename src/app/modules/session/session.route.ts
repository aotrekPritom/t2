import express from 'express';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { SessionControllers } from './session.controller';

const router = express.Router();

// create session
router.post(
  '/create-session/:courseId',
  auth(UserRole.TEACHER),
  SessionControllers.scheduleSession,
);

// get session details
router.get(
  '/:sessionId',
  auth(UserRole.USER,UserRole.TEACHER),
  SessionControllers.getSessionDetails,
);

export const SessionRoutes = router;
