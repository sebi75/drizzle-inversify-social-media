import Database from '@/db/db';
import { Account, accounts } from '@/db/schema';
import { TYPES } from '@/lib/types';
import { eq } from 'drizzle-orm';
import { inject, injectable } from 'inversify';

@injectable()
class AccountRepository {
	constructor(@inject(TYPES.Database) private db: Database) {}

	createAccount = async ({
		email,
		hashedPassword,
		salt,
	}: {
		email: string;
		hashedPassword: string;
		salt: string;
	}): Promise<Account> => {
		const result = await this.db.getDb().insert(accounts).values({
			email,
			createdAt: new Date(),
			hashedPassword,
			lastLogin: new Date(),
		});
		const accountId = result[0].insertId;
		const account = await this.db
			.getDb()
			.select()
			.from(accounts)
			.where(eq(accounts.id, accountId));
		return account[0];
	};

	getAccountByEmail = async (email: string): Promise<Account | null> => {
		const account = await this.db
			.getDb()
			.select()
			.from(accounts)
			.where(eq(accounts.email, email));
		if (account.length === 0) {
			return null;
		}
		return account[0];
	};
}

export default AccountRepository;