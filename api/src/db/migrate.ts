import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
	console.error('Environment variable DATABASE_URL is not defined');
	process.exit(1);
}

const runMigrate = async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined');
	}

	const connection = createConnection(DATABASE_URL);

	const db = drizzle(connection);

	console.log('⏳ Running migrations...');

	const start = Date.now();

	await migrate(db, { migrationsFolder: 'drizzle' });

	const end = Date.now();

	console.log(`✅ Migrations completed in ${end - start}ms`);

	process.exit(0);
};

runMigrate().catch((err) => {
	console.error('❌ Migration failed');
	console.error(err);
	process.exit(1);
});
