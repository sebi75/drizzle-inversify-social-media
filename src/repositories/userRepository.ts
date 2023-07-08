import { inject, injectable } from 'inversify';
import Database from '@/db/db';
import { TYPES } from '@/lib/types';
import { User, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

@injectable()
class UserRepository {
	constructor(@inject(TYPES.Database) private db: Database) {}

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
