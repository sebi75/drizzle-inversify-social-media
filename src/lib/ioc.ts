import 'reflect-metadata';
import { Container } from 'inversify';
import UserController from '@/api/controllers/UserController';
import UserService from '@/services/userService';
import Database from '@/db/db';
import { TYPES } from './types';

const container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<Database>(TYPES.Database).to(Database);

export { container };
