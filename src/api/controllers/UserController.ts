import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import UserService from '@/services/userService';
import { TYPES } from '@/lib/types';

@injectable()
class UserController {
	constructor(@inject(TYPES.UserService) private userService: UserService) {}

	getUser = async (req: Request, res: Response): Promise<void> => {
		const { id } = req.params;

		const user = await this.userService.getUserById(parseInt(id));

		res.json(user);
	};
}

export default UserController;
