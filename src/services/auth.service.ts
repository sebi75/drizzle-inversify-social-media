import { injectable, inject } from "inversify";
import { TYPES } from "@/lib/types";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/lib/errors";
import JwtService from "./jwt.service";
import HashingService from "./hashing.service";
import UserService from "./user.service";
import { type User } from "@/db/schema";
import { type TokenPayload } from "./domain/auth.domain";
import AccountService from "./account.service";

@injectable()
class AuthService {
  constructor(
    @inject(TYPES.AccountService) private accountService: AccountService,
    @inject(TYPES.JwtService) private jwtService: JwtService,
    @inject(TYPES.HashingService) private hashingService: HashingService,
    @inject(TYPES.UserService) private userService: UserService
  ) {}

  signin = async (params: { email: string; password: string }) => {
    const { email, password } = params;
    const account =
      await this.accountService.getAccountWithHashedPasswordByEmail(email);

    if (!account) {
      throw new NotFoundError("Account not found");
    }

    const isValid = await this.hashingService.compare(
      password,
      account.hashedPassword
    );
    const user = (await this.userService.getUserByEmail(email)) as User;

    if (!isValid) {
      throw new UnauthorizedError("Invalid password");
    }

    const tokenObject: TokenPayload = {
      email: account.email,
      role: user.role,
      userId: user.id,
    };
    const token = this.jwtService.sign(tokenObject, {
      expiresIn: "7d",
    });

    return {
      token,
    };
  };

  signup = async (params: { email: string; password: string; age: number }) => {
    const { email, password, age } = params;
    const account = await this.accountService.getAccountByEmail(email);

    if (account) {
      throw new BadRequestError("Email already exists");
    }

    const { salt, hash } = await this.hashingService.hash(password);

    const newAccount = await this.accountService.createAccount({
      email,
      hashedPassword: hash,
      salt,
    });

    const user = await this.userService.createUser({
      email,
      age,
    });

    const token = this.jwtService.sign(
      {
        id: newAccount.id,
        email: newAccount.email,
        role: "todo",
      },
      {
        expiresIn: "7d",
      }
    );

    return {
      account: newAccount,
      user,
      token,
    };
  };
}

export default AuthService;
