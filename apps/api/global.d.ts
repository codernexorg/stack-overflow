export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASS: string;
      JWT_SECRET: string;
    }
  }
}
