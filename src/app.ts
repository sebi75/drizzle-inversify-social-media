import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { container } from '@/lib/ioc';
import { userRoutes } from '@/api/routes/userRoutes';

dotenv.config();

const app = express();

app.use('/users', userRoutes(container));

app.listen(process.env.PORT, () => {
	console.log('Server listening on port ' + process.env.PORT + '...');
});
