import "reflect-metadata";
import { type Request, type Response } from "express";
import { ErrorMessage, StatusCode } from "@/types/statusCodes";
import { type User, UserRole } from "@/db/schema";
import type JwtService from "@/services/jwt.service";
import { type TokenPayload } from "@/services/domain/auth.domain";
import { logger } from "@/utils/logger";
import { container } from "@/lib/ioc";
import type UserService from "@/services/user.service";
import { TYPES } from "@/lib/types";
import { type Context } from "@/types/context";

declare module "express" {
  interface Request {
    ctx?: Context;
  }
}

export function Security(authorizedRoles?: UserRole[]): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void {
    const jwtService = container.get<JwtService>(TYPES.JwtService);
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const req: Request = args[0];
      const res: Response = args[1];
      /* eslint-disable @typescript-eslint/no-this-alias */
      const instance = this;
      const boundMethod = originalMethod.bind(instance);

      logger.info("Security::layer::called");
      const token = req.headers.authorization?.split(" ")[1];
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
            throw new Error(ErrorMessage.UNAUTHORIZED);
          }
          const userService = container.get<UserService>(TYPES.UserService);
          const user = (await userService.getUserById(
            decodedToken.userId
          )) as User;
          if (user.banned) {
            throw new Error(ErrorMessage.UNAUTHORIZED);
          }
          logger.info(`Access::Granted::${user.email}-${user.id}-${user.role}`);
          req.ctx = {
            user: {
              email: user.email,
              id: user.id,
              role: user.role,
            },
          };

          boundMethod(...args);
          return;
        } catch (error) {
          logger.error("Access::denied::in::security::layer");
          res.status(StatusCode.UNAUTHORIZED).json({
            message: ErrorMessage.UNAUTHORIZED,
          });
          return;
        }
      }

      logger.error("Access::denied::in::security::layer");
      res.status(StatusCode.UNAUTHORIZED).json({
        message: ErrorMessage.UNAUTHORIZED,
      });
      return;
    };
  };
}
