import { StatusCode } from '@/types/statusCodes';

export class AppError extends Error {
	statusCode: StatusCode;
	constructor(message: string, statusCode: StatusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends AppError {
	constructor(message: string) {
		super(message, StatusCode.BAD_REQUEST);
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string) {
		super(message, StatusCode.UNAUTHORIZED);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string) {
		super(message, StatusCode.NOT_FOUND);
	}
}

export class InternalServerError extends AppError {
	constructor(message: string) {
		super(message, StatusCode.INTERNAL_SERVER_ERROR);
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string) {
		super(message, StatusCode.FORBIDDEN);
	}
}
