export enum Dependendencies {
	UserService = 'UserService',
	UserRepository = 'UserRepository',
	UserController = 'UserController',
	Database = 'Database',
	AuthController = 'AuthController',
	AuthRepository = 'AuthRepository',
	AuthService = 'AuthService',
	JwtService = 'JwtService',
	HashingService = 'HashingService',
}

export const TYPES = {
	UserService: Symbol.for(Dependendencies.UserService),
	UserController: Symbol.for(Dependendencies.UserController),
	Database: Symbol.for(Dependendencies.Database),
	AuthController: Symbol.for(Dependendencies.AuthController),
	UserRepository: Symbol.for(Dependendencies.UserRepository),
	AuthRepository: Symbol.for(Dependendencies.AuthRepository),
	AuthService: Symbol.for(Dependendencies.AuthService),
	JwtService: Symbol.for(Dependendencies.JwtService),
	HashingService: Symbol.for(Dependendencies.HashingService),
};
