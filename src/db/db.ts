import mysql2 from 'mysql2';
import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '../env/env.cjs';
import { injectable } from 'inversify';

@injectable()
class Database {
	private readonly connection: mysql2.Connection;

	constructor() {
		this.connection = this.getConnection();
	}
	getConnection = () => {
		console.log('Making new connection to the database...');

		const connection = mysql2.createConnection({
			host: env.DB_HOST,
			port: parseInt(env.DB_PORT),
			user: env.DB_USER,
			password: env.DB_PASS,
			database: env.DB_NAME,
		});

		return connection;
	};

	getDb = () => {
		return drizzle(this.connection);
	};
}

export default Database;
