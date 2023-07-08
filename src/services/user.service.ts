import { inject, injectable } from 'inversify';
import { TYPES } from '@/lib/types';
import { GetUsersParams } from './domain/user.domain';
import UserRepository from '@/repositories/userRepository';

@injectable()
class UserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: UserRepository
	) {}
	getUserById = async (id: number) => {
		return await this.userRepository.getUserById(id);
	};

	getUsers = async (params: GetUsersParams) => {
		return await this.userRepository.getUsers(params);
	};
}

export default UserService;
