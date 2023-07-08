export enum Dependendencies {
	UserService = 'UserService',
	UserController = 'UserController',
	Database = 'Database',
}

export const TYPES = {
	UserService: Symbol.for(Dependendencies.UserService),
	UserController: Symbol.for(Dependendencies.UserController),
	Database: Symbol.for(Dependendencies.Database),
};