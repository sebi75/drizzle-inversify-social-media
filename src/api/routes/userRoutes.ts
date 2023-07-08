import UserController from '@/api/controllers/UserController';
import { TYPES } from '@/lib/types';
import { Router } from 'express';
import { Container } from 'inversify';

export const userRoutes = (container: Container) => {
	const router = Router();
	const userController = container.get<UserController>(TYPES.UserController);

	router.get('/:id', userController.getUser);
	router.get('/:offset/:limit', userController.getUsers);

	return router;
};
