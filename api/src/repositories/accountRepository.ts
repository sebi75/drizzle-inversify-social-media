import Database from "@/db/db";
import { type Account, accounts } from "@/db/schema";
import { TYPES } from "@/lib/types";
import { eq } from "drizzle-orm";
import { inject, injectable } from "inversify";

@injectable()
class AccountRepository {
  constructor(@inject(TYPES.Database) private db: Database) {}

  createAccount = async ({
    email,
    hashedPassword,
  }: {
    email: string;
    hashedPassword: string;
    salt: string;
  }): Promise<Account> => {
    const [result] = await this.db.getDb().insert(accounts).values({
      email,
      createdAt: new Date(),
      hashedPassword,
      lastLogin: new Date(),
    });
    const accountId = result.insertId;
    const [account] = await this.db
      .getDb()
      .select()
      .from(accounts)
      .where(eq(accounts.id, accountId));
    return account;
  };

  getAccountByEmail = async (email: string): Promise<Account | null> => {
    const [account] = await this.db
      .getDb()
      .select()
      .from(accounts)
      .where(eq(accounts.email, email));

    return account;
  };
}

export default AccountRepository;
