import mysql2 from 'mysql2';
import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '../env/env.cjs';
import { injectable } from 'inversify';

@injectable()
class Database {
	private connection: mysql2.Connection | undefined;

	constructor() {
		this.connection = this.getConnection();
	}

	getConnection = () => {
		if (this.connection) {
			return this.connection;
		} else {
			return this.createConnection();
		}
	};

	createConnection = () => {
		console.log('Creating new connection to database...');
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
		return drizzle(this.getConnection());
	};
}

export default Database;
