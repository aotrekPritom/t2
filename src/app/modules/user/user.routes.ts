import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// create author
router.post('/create-student', UserControllers.createUser);
// create teacher
router.post('/create-teacher', UserControllers.createTeacher);
// get all suer
router.get('/', UserControllers.getAllUser);

export const UserRoutes = router;
