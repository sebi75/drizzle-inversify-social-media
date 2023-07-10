import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import UserService from '@/services/user.service';
import { TYPES } from '@/lib/types';
import { Security } from '../middlewares/security';
import { container } from '@/lib/ioc';

@injectable()
class UserController {
	constructor(@inject(TYPES.UserService) private userService: UserService) {}

	@Security()
	async getUser(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const usersService = container.get<UserService>(TYPES.UserService);

		const user = await usersService.getUserById(parseInt(id));

		res.json(user);
	}

	getUsers = async (req: Request, res: Response): Promise<void> => {
		const { limit, offset } = req.query;

		const users = await this.userService.getUsers({
			limit: parseInt(limit as string) ?? 10,
			offset: parseInt(offset as string) ?? 0,
		});

		res.json(users);
	};
}

export default UserController;
