import { Router } from 'express';
import { type Container } from 'inversify';
import type AuthController from '../controllers/AuthController';
import { TYPES } from '@/lib/types';

export const authRoutes = (container: Container) => {
	const router = Router();
	const authController = container.get<AuthController>(TYPES.AuthController);

	router.post('/login', authController.login);
	router.post('/signup', authController.signup);

	return router;
};
