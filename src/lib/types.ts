export enum Dependendencies {
	UserService = 'UserService',
	UserRepository = 'UserRepository',
	UserController = 'UserController',
	Database = 'Database',
	AuthController = 'AuthController',
	AccountRepository = 'AccountRepository',
	AuthService = 'AuthService',
	JwtService = 'JwtService',
	HashingService = 'HashingService',
	AccountService = 'AccountService',
}

export const TYPES = {
	UserService: Symbol.for(Dependendencies.UserService),
	UserController: Symbol.for(Dependendencies.UserController),
	Database: Symbol.for(Dependendencies.Database),
	AuthController: Symbol.for(Dependendencies.AuthController),
	UserRepository: Symbol.for(Dependendencies.UserRepository),
	AccountRepository: Symbol.for(Dependendencies.AccountRepository),
	AuthService: Symbol.for(Dependendencies.AuthService),
	JwtService: Symbol.for(Dependendencies.JwtService),
	HashingService: Symbol.for(Dependendencies.HashingService),
	AccountService: Symbol.for(Dependendencies.AccountService),
};
