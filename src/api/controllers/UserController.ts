import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import UserService from '@/services/user.service';
import { TYPES } from '@/lib/types';

@injectable()
class UserController {
	constructor(@inject(TYPES.UserService) private userService: UserService) {}

	getUser = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		const user = await this.userService.getUserById(parseInt(id));

		res.json(user);
	};

	getUsers = async (req: Request, res: Response): Promise<void> => {
		const { offset, limit } = req.params;

		const users = await this.userService.getUsers({
			limit: parseInt(limit),
			offset: parseInt(offset),
		});

		res.json(users);
	};
}

export default UserController;
