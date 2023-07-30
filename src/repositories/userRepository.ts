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
    const user = await this.db
      .getDb()
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (user.length === 0) {
      return null;
    }
    return user[0];
  };

  createUser = async (params: { email: string; age: number }) => {
    const db = this.db.getDb();

    const insertUserParams = {
      email: params.email,
      createdAt: new Date(),
    };
    const userInsertResult = await db.insert(users).values(insertUserParams);
    const userId = userInsertResult[0].insertId;
    const userResult = (
      await db.select().from(users).where(eq(users.id, userId))
    )[0];

    const profileParams = {
      userId,
      age: +params.age,
      bio: "",
      profilePicture: "",
    };
    // userProfileId is the userId
    await db.insert(userProfile).values(profileParams);
    const userProfileResult = (
      await db.select().from(userProfile).where(eq(userProfile.userId, userId))
    )[0];

    return {
      ...userResult,
      profile: userProfileResult,
    };
  };

  createUserProfile = async (
    params: z.infer<typeof insertUserProfileSchema>
  ) => {
    const db = this.db.getDb();
    const result = await db.insert(userProfile).values(params);
    const userProfileId = result[0].insertId;
    params.userId = userProfileId;
    return params;
  };

  getUserById = async (id: number) => {
    const user = await this.db
      .getDb()
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (user.length === 0) {
      return null;
    }
    return user[0] as User;
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
    return (
      await this.db.getDb().select().from(users).where(eq(users.id, userId))
    )[0];
  };
}

export default UserRepository;
