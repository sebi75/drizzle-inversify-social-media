import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();
// !process.env.SKIP_ENV_VALIDATION && (await import('./src/env/env.cjs'));

export default {
	schema: './src/db/schema.ts',
	out: './drizzle',
	driver: 'mysql2',
	breakpoints: true,
	dbCredentials: {
		database: process.env.DB_NAME as string,
		host: process.env.DB_HOST as string,
		port: parseInt(process.env.DB_PORT as string),
		password: process.env.DB_PASS as string,
		user: process.env.DB_USER as string,
	},
} satisfies Config;
