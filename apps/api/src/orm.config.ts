import { DataSource } from "typeorm";
import { santizedEnv } from "env";
import { Question, Tag, User } from "@entities";

export const appDataSource = new DataSource({
  type: "mysql",
  database: santizedEnv.DB_NAME,
  host: santizedEnv.DB_HOST,

  port: santizedEnv.DB_PORT,
  username: santizedEnv.DB_USER,
  password: santizedEnv.DB_PASS,

  synchronize: santizedEnv.NODE_ENV === "development",
  entities: [User, Tag, Question],
  logging: santizedEnv.NODE_ENV === "development",
});
