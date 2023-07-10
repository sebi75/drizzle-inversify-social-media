import { env } from '@/env/env.cjs';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
class JwtService {
	private readonly _secret: string;

	constructor() {
		this._secret = env.JWT_SECRET;
	}
	sign = (payload: object, options?: jwt.SignOptions) => {
		return jwt.sign(payload, this._secret, options);
	};

	decode = (token: string) => {
		return jwt.decode(token);
	};

	verify = (token: string) => {
		return jwt.verify(token, this._secret);
	};
}

export default JwtService;
