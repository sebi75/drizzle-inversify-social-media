import "reflect-metadata";
import { Container } from "inversify";
import JwtService from "@/services/jwt.service";
import { TYPES } from "./types";

// we need to initiate the container before importing other services
// that use decorators and import the services and initiate them before
// because when parsing the classes, decorators are executed and when they
// import the container, the container is not yet initiated
const container = new Container();
container.bind<JwtService>(TYPES.JwtService).to(JwtService);

import UserController from "@/api/controllers/UserController";
import UserService from "@/services/user.service";
import Database from "@/db/db";
import AuthController from "@/api/controllers/AuthController";
import UserRepository from "@/repositories/userRepository";
import HashingService from "@/services/hashing.service";
import AuthService from "@/services/auth.service";
import AccountRepository from "@/repositories/accountRepository";
import AccountService from "@/services/account.service";
import PostsRepository from "@/repositories/postsRepository";
import PostsClassifierService from "@/services/posts-classifier.service";
import PostsService from "@/services/posts.service";
import { logger } from "@/utils/logger";

logger.info("IOC::initiating-dependency-container");

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<AccountRepository>(TYPES.AccountRepository)
  .to(AccountRepository);
container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<HashingService>(TYPES.HashingService).to(HashingService);
container.bind<PostsRepository>(TYPES.PostsRepository).to(PostsRepository);
container.bind<PostsService>(TYPES.PostsService).to(PostsService);
container
  .bind<PostsClassifierService>(TYPES.PostsClassifierService)
  .to(PostsClassifierService);

// singleton
container.bind<Database>(TYPES.Database).to(Database).inSingletonScope();

logger.info("IOC::dependency-container-initiated::exporting-container");

export { container };
