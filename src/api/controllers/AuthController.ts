import Database from '@/db/db';
import { TYPES } from '@/lib/types';
import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';

@injectable()
class AuthController {
	constructor(@inject(TYPES.Database) private db: Database) {}

	login = async (req: Request, res: Response): Promise<void> => {
		//implement
	};

	signup = async (req: Request, res: Response): Promise<void> => {
		//implement
	};
}

export default AuthController;
