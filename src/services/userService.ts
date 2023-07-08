import { inject, injectable } from 'inversify';
import Database from '@/db/db';
import { TYPES } from '@/lib/types';
import { User, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

@injectable()
class UserService {
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
}

export default UserService;
