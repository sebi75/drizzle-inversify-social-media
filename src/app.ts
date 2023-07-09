import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { container } from '@/lib/ioc';
import { userRoutes } from '@/api/routes/userRoutes';
import { authRoutes } from './api/routes/authRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes(container));
app.use('/auth', authRoutes(container));

app.listen(process.env.PORT, () => {
	console.log('Server listening on port ' + process.env.PORT + '...');
});
