import { inject, injectable } from "inversify";
import { TYPES } from "@/lib/types";
import { type GetUsersParams } from "./domain/user.domain";
import UserRepository from "@/repositories/userRepository";
import { type updateUserProfileSchemaRequest, type User } from "@/db/schema";
import { type z } from "zod";

@injectable()
class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  createUser = async (params: {
    age: number;
    email: string;
  }): Promise<User> => {
    const result = await this.userRepository.createUser(params);
    return result;
  };

  getUserProfile = async (userId: number) => {
    return await this.userRepository.getUserProfileById(userId);
  };

  updateProfile = async (
    updateParams: z.infer<typeof updateUserProfileSchemaRequest>,
    userId: number
  ) => {
    const updatedUserProfile = await this.userRepository.updateUserProfile(
      updateParams,
      userId
    );
    const user = await this.userRepository.getUserById(userId);
    return {
      ...user,
      profile: updatedUserProfile,
    };
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.getUserByEmail(email);
  };

  getUserById = async (id: number) => {
    return await this.userRepository.getUserById(id);
  };

  getUsers = async (params: GetUsersParams) => {
    return await this.userRepository.getUsers(params);
  };
}

export default UserService;
