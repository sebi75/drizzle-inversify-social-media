import 'reflect-metadata';
import { Container } from 'inversify';
import UserController from '@/api/controllers/UserController';
import UserService from '@/services/user.service';
import Database from '@/db/db';
import { TYPES } from './types';
import AuthController from '@/api/controllers/AuthController';

const container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<Database>(TYPES.Database).to(Database);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export { container };
