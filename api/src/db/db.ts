import mysql2 from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../env/env";
import { injectable } from "inversify";
import { logger } from "@/utils/logger";

@injectable()
class Database {
  private connection: mysql2.Connection | undefined;

  constructor() {
    this.connection = this.getConnection();
  }

  getConnection = () => {
    if (this.connection) {
      return this.connection;
    } else {
      return this.createConnection();
    }
  };

  createConnection = () => {
    logger.info("Creating new connection to database...");
    logger.info("DB_HOST: " + env.DB_HOST);
    const connection = mysql2.createConnection({
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT),
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
    });

    return connection;
  };

  getDb = () => {
    return drizzle(this.getConnection());
  };
}

export default Database;
