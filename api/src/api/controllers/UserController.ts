import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import UserService from "@/services/user.service";
import { TYPES } from "@/lib/types";
import { container } from "@/lib/ioc";
import { Security } from "../middlewares/security";
import { updateUserProfileSchemaRequest } from "@/db/schema";
import { logger } from "@/utils/logger";
import { StatusCode } from "@/types/statusCodes";
import { type ContextUser } from "@/types/context";

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

  @Security()
  async getUsers(req: Request, res: Response): Promise<void> {
    const { limit, offset } = req.query;

    const users = await this.userService.getUsers({
      limit: parseInt(limit as string) ?? 10,
      offset: parseInt(offset as string) ?? 0,
    });

    res.json(users);
  }

  @Security()
  async updateProfile(req: Request, res: Response): Promise<void> {
    const user = req.ctx?.user as ContextUser;
    const params = updateUserProfileSchemaRequest.safeParse(req.body);
    if (!params.success) {
      logger.error("error validating payload: ", params.error);
      res.status(StatusCode.BAD_REQUEST).json({ message: "Invalid input" });
      return;
    }

    try {
      const updatedUser = await this.userService.updateProfile(
        params.data,
        user.id
      );

      res.status(StatusCode.OK).json(updatedUser);
    } catch (error) {
      logger.error("error updating user profile: ", error);
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
}

export default UserController;
