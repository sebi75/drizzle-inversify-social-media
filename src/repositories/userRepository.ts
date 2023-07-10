import { inject, injectable } from 'inversify';
import Database from '@/db/db';
import { TYPES } from '@/lib/types';
import { User, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

@injectable()
class UserRepository {
	constructor(@inject(TYPES.Database) private db: Database) {}

	getUserByEmail = async (email: string): Promise<User | null> => {
		const user = await this.db
			.getDb()
			.select()
			.from(users)
			.where(eq(users.email, email));

		if (user.length === 0) {
			return null;
		}
		return user[0];
	};

	createUser = async (params: {
		email: string;
		age: string;
	}): Promise<User> => {
		const result = await this.db
			.getDb()
			.insert(users)
			.values({
				email: params.email,
				age: parseInt(params.age),
			});
		const userId = result[0].insertId;
		const user = await this.db
			.getDb()
			.select()
			.from(users)
			.where(eq(users.id, userId));
		return user[0];
	};

	getUserById = async (id: number): Promise<User | null> => {
		const user = await this.db
			.getDb()
			.select()
			.from(users)
			.where(eq(users.id, id));

		if (user.length === 0) {
			return null;
		}
		return user[0];
	};

	getUsers = async (params: {
		limit: number;
		offset: number;
	}): Promise<User[]> => {
		return await this.db
			.getDb()
			.select()
			.from(users)
			.limit(params.limit)
			.offset(params.offset);
	};
}

export default UserRepository;
