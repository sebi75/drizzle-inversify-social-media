import { TYPES } from "@/lib/types";
import { injectable, inject } from "inversify";
import { type Request, type Response } from "express";
import AuthService from "@/services/auth.service";
import { AppError, BadRequestError } from "@/lib/errors";
import { logger } from "@/utils/logger";
import { signupSchema, signinSchema } from "./schemas/authController";
import { StatusCode } from "@/types/statusCodes";

@injectable()
class AuthController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    const params = signinSchema.safeParse(req.body);
    if (!params.success) {
      logger.error("Error validating signin schema: ", params.error);
      res.status(StatusCode.BAD_REQUEST).json({ message: "Invalid input" });
      return;
    }

    try {
      const token = await this.authService.signin(params.data);

      logger.info("User just signed in: ", params.data.email);
      res.status(StatusCode.OK).json(token);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  };

  signup = async (req: Request, res: Response): Promise<void> => {
    const params = signupSchema.safeParse(req.body);
    if (!params.success) {
      logger.error("Error validating signup schema: ", params.error);
      res.status(StatusCode.BAD_REQUEST).json({ message: "Invalid input" });
      return;
    }

    try {
      const newAccount = await this.authService.signup(params.data);
      logger.info("New account created: ", newAccount);
      res.status(201).json(newAccount);
    } catch (error) {
      logger.error(error);
      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  };
}

export default AuthController;
