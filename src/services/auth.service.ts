import { injectable, inject } from 'inversify';
import { TYPES } from '@/lib/types';
import AuthRepository from '@/repositories/authRepository';
import { BadRequestError } from '@/lib/errors';
import JwtService from './jwt.service';
import HashingService from './hashing.service';
import UserService from './user.service';

@injectable()
class AuthService {
	constructor(
		@inject(TYPES.AuthRepository) private authRepository: AuthRepository,
		@inject(TYPES.JwtService) private jwtService: JwtService,
		@inject(TYPES.HashingService) private hashingService: HashingService,
		@inject(TYPES.UserService) private userService: UserService
	) {}

	createAccount = async (params: {
		email: string;
		password: string;
		age: string;
	}) => {
		const { email, password, age } = params;
		const account = await this.authRepository.getAccountByEmail(email);

		if (account) {
			throw new BadRequestError('Email already exists');
		}

		const { salt, hash } = await this.hashingService.hash(password);

		const newAccount = await this.authRepository.createAccount({
			email,
			hashedPassword: hash,
			salt,
		});

		const user = await this.userService.createUser({
			email,
			age,
		});

		const token = this.jwtService.sign(
			{
				id: newAccount.id,
				email: newAccount.email,
				role: 'todo',
			},
			{
				expiresIn: '7d',
			}
		);

		return {
			account: newAccount,
			user,
			token,
		};
	};
}

export default AuthService;
