import { injectable, inject } from 'inversify';
import bcrypt from 'bcrypt';

@injectable()
class HashingService {
	private readonly _saltRounds: number = 10;

	private generateSalt = async () => {
		return await bcrypt.genSalt(this._saltRounds);
	};

	hash = async (payload: string) => {
		const salt = await this.generateSalt();
		const hash = await bcrypt.hash(payload, salt);

		return {
			salt,
			hash,
		};
	};

	compare = async (payload: string, hashedPayload: string) => {
		return await bcrypt.compare(payload, hashedPayload);
	};
}

export default HashingService;
