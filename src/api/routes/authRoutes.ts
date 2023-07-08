import { Router } from 'express';
import { Container } from 'inversify';
import AuthController from '../controllers/AuthController';
import { TYPES } from '@/lib/types';

export const authRoutes = (container: Container) => {
	const router = Router();
	const authController = container.get<AuthController>(TYPES.AuthController);

	router.post('/login', authController.login);
	router.post('/signup', authController.signup);

	return router;
};
