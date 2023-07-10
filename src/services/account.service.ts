import { inject, injectable } from 'inversify';
import { TYPES } from '@/lib/types';
import AccountRepository from '@/repositories/accountRepository';
import { type Account } from '@/db/schema';
import { type AccountDTO } from './domain/account.domain';

@injectable()
class AccountService {
	constructor(
		@inject(TYPES.AccountRepository)
		private accountRepository: AccountRepository
	) {}

	createAccount = async (params: {
		email: string;
		hashedPassword: string;
		salt: string;
	}) => {
		const { email, hashedPassword, salt } = params;
		const account = await this.accountRepository.createAccount({
			email,
			hashedPassword,
			salt,
		});
		return this.toDTO(account);
	};

	getAccountByEmail = async (email: string) => {
		const account = await this.accountRepository.getAccountByEmail(email);

		return account ? this.toDTO(account) : null;
	};

	getAccountWithHashedPasswordByEmail = async (email: string) => {
		const account = await this.accountRepository.getAccountByEmail(email);
		return account;
	};

	private toDTO = (account: Account): AccountDTO => ({
		id: account.id,
		email: account.email,
		createdAt: account.createdAt,
		lastLogin: account.lastLogin,
		updatedAt: account.updatedAt,
	});
}

export default AccountService;
