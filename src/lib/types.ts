export enum Dependendencies {
	UserService = 'UserService',
	UserRepository = 'UserRepository',
	UserController = 'UserController',
	Database = 'Database',
	AuthController = 'AuthController',
}

export const TYPES = {
	UserService: Symbol.for(Dependendencies.UserService),
	UserController: Symbol.for(Dependendencies.UserController),
	Database: Symbol.for(Dependendencies.Database),
	AuthController: Symbol.for(Dependendencies.AuthController),
	UserRepository: Symbol.for(Dependendencies.UserRepository),
};
