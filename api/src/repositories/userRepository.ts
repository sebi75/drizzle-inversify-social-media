import { inject, injectable } from "inversify";
import Database from "@/db/db";
import { TYPES } from "@/lib/types";
import {
  type User,
  users,
  userProfile,
  type insertUserProfileSchema,
  type updateUserProfileSchemaRequest,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { type z } from "zod";

@injectable()
class UserRepository {
  constructor(@inject(TYPES.Database) private db: Database) {}

  getUserByEmail = async (email: string) => {
    const [user] = await this.db
      .getDb()
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user;
  };

  createUser = async (params: { email: string; age: number }) => {
    const db = this.db.getDb();

    const user = await db.transaction(async (tx) => {
      const insertUserParams = {
        email: params.email,
        createdAt: new Date(),
      };
      const [userInsertResult] = await tx
        .insert(users)
        .values(insertUserParams);
      const userId = userInsertResult.insertId;
      const [userResult] = await tx
        .select()
        .from(users)
        .where(eq(users.id, userId));

      const profileParams = {
        userId,
        age: params.age,
        bio: "",
        profilePicture: "",
      };
      // userProfileId is the userId
      await tx.insert(userProfile).values(profileParams);
      const [userProfileResult] = await tx
        .select()
        .from(userProfile)
        .where(eq(userProfile.userId, userId));

      return {
        ...userResult,
        profile: userProfileResult,
      };
    });

    return user;
  };

  createUserProfile = async (
    params: z.infer<typeof insertUserProfileSchema>
  ) => {
    const db = this.db.getDb();
    const [result] = await db.insert(userProfile).values(params);
    const userProfileId = result.insertId;
    params.userId = userProfileId;
    return params;
  };

  getUserById = async (id: number) => {
    const [user] = await this.db
      .getDb()
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user;
  };

  getUsers = async (params: {
    limit: number;
    offset: number;
  }): Promise<User[]> => {
    return await this.db
      .getDb()
      .select()
      .from(users)
      .limit(params.limit)
      .offset(params.offset);
  };

  updateUserProfile = async (
    params: z.infer<typeof updateUserProfileSchemaRequest>,
    userId: number
  ) => {
    const db = this.db.getDb();
    await db
      .update(userProfile)
      .set({
        age: params.age,
        bio: params.bio,
        profilePicture: params.profilePicture,
      })
      .where(eq(userProfile.userId, userId));
    return await this.getUserProfileById(userId);
  };

  getUserProfileById = async (userId: number) => {
    const db = this.db.getDb();
    const [result] = await db.select().from(users).where(eq(users.id, userId));
    return result;
  };
}

export default UserRepository;
