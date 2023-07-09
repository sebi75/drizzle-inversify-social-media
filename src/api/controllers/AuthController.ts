import { TYPES } from '@/lib/types';
import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import AuthService from '@/services/auth.service';
import { BadRequestError } from '@/lib/errors';
import { logger } from '@/utils/logger';

@injectable()
class AuthController {
	constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

	login = async (req: Request, res: Response): Promise<void> => {
		//implement
	};

	signup = async (req: Request, res: Response): Promise<void> => {
		const { email, password, age } = req.body;

		try {
			const newAccount = await this.authService.createAccount({
				email,
				password,
				age,
			});
			logger.info('New account created: ', newAccount);
			res.status(201).json(newAccount);
		} catch (error) {
			logger.error(error);
			if (error instanceof BadRequestError) {
				res.status(400).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'Internal Server Error' });
			}
		}
	};
}

export default AuthController;
