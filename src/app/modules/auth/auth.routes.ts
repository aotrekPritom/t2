import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidationSchemas } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidationSchemas.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
