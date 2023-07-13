import 'reflect-metadata';
import { Container } from 'inversify';
import UserController from '@/api/controllers/UserController';
import UserService from '@/services/user.service';
import Database from '@/db/db';
import { TYPES } from './types';
import AuthController from '@/api/controllers/AuthController';
import UserRepository from '@/repositories/userRepository';
import JwtService from '@/services/jwt.service';
import HashingService from '@/services/hashing.service';
import AuthService from '@/services/auth.service';
import AccountRepository from '@/repositories/accountRepository';
import AccountService from '@/services/account.service';

const container = new Container();
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
	.bind<AccountRepository>(TYPES.AccountRepository)
	.to(AccountRepository);
container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<JwtService>(TYPES.JwtService).to(JwtService);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<HashingService>(TYPES.HashingService).to(HashingService);

// singleton
container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();

export { container };
