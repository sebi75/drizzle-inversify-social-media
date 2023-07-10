import { inject, injectable } from 'inversify';
import { TYPES } from '@/lib/types';
import { GetUsersParams } from './domain/user.domain';
import UserRepository from '@/repositories/userRepository';
import { User } from '@/db/schema';

@injectable()
class UserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: UserRepository
	) {}

	createUser = async (params: {
		age: string;
		email: string;
	}): Promise<User> => {
		const result = await this.userRepository.createUser(params);
		return result;
	};

	getUserByEmail = async (email: string) => {
		return await this.userRepository.getUserByEmail(email);
	};

	getUserById = async (id: number) => {
		return await this.userRepository.getUserById(id);
	};

	getUsers = async (params: GetUsersParams) => {
		return await this.userRepository.getUsers(params);
	};
}

export default UserService;
