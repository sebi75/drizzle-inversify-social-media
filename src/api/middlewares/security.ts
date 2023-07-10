import { type Request, type Response } from 'express';
import { StatusCode } from '@/types/statusCodes';
import { type User, UserRole } from '@/db/schema';
import JwtService from '@/services/jwt.service';
import { type TokenPayload } from '@/services/domain/auth.domain';
import { logger } from '@/utils/logger';
import { container } from '@/lib/ioc';
import type UserService from '@/services/user.service';
import { TYPES } from '@/lib/types';

declare module 'express' {
	interface Request {
		ctx?: {
			user: {
				id: number;
				email: string;
				role: string;
			};
		};
	}
}

export function Security(authorizedRoles?: UserRole[]): MethodDecorator {
	return function (
		target: Object,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor
	): void {
		const jwtService = new JwtService();
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			const req: Request = args[0];
			const res: Response = args[1];

			logger.info('Security layer invoked');
			const token = req.headers.authorization?.split(' ')[1];
			if (token) {
				try {
					jwtService.verify(token);

					const decodedToken = jwtService.decode(token) as TokenPayload;
					const isOnlyAdmin =
						authorizedRoles &&
						authorizedRoles.length === 1 &&
						authorizedRoles[0] === UserRole.ADMIN;
					const isAdmin = (decodedToken.role as UserRole) === UserRole.ADMIN;
					if (isOnlyAdmin && !isAdmin) {
						throw new Error('Unauthorized');
					}
					const userService = container.get<UserService>(TYPES.UserService);
					const user = (await userService.getUserById(
						decodedToken.userId
					)) as User;
					if (user.banned) {
						throw new Error('Unauthorized');
					}
					logger.info(
						`User ${user.email} with id ${user.id} and role ${user.role} is authorized`
					);
					req.ctx = {
						user: {
							email: user.email,
							id: user.id,
							role: user.role,
						},
					};
					originalMethod.apply(this, args);
					return;
				} catch (error) {
					logger.error('Access denied in security layer');
					res.status(StatusCode.UNAUTHORIZED).json({
						message: 'Unauthorized',
					});
					return;
				}
			}

			logger.error('Access denied in security layer');
			res.status(StatusCode.UNAUTHORIZED).json({
				message: 'Unauthorized',
			});
			return;
		};
	};
}
