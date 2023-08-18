import "reflect-metadata";
import express, { Application } from "express";
import { appDataSource } from "orm.config";
import { santizedEnv } from "env";
import { userRoutes } from "routes/user";
import cors from "cors";
import { error } from "@middleware";
import cookieParser from "cookie-parser";
import { authRoutes, questionRoutes } from "@routes";
import { seed } from "db/seed";
import { tagRoutes } from "routes/tag";
const mountServer = async (app: Application) => {
  /**
   * Enabling Cors
   */

  const whiteList = ["http://localhost:3000"];
  app.use(
    cors({
      origin: (origin, callback) => {
        if (origin && whiteList.includes(origin)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
      credentials: true,
    })
  );

  /**
   * System Middleware
   */
  app.use(express.json({ limit: "1000mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1000mb" }));
  app.use(cookieParser());
  /**
   * ORM Initalization
   */
  await appDataSource.initialize();

  /**
   * Routes
   */
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/question", questionRoutes);
  app.use("/api/v1/tags", tagRoutes);
  app.use("/api/v1/db/seed", async (req, res) => {
    seed()
      .then(() => {
        res.status(200).json({ message: "Seed Successfully Completed" });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  // Handling error during api call
  app.use(error);

  /**
   * Server listening
   */
  const server = app.listen(santizedEnv.PORT || 8080);

  server.on("listening", () => {
    console.log("server running on https://localhost:" + santizedEnv.PORT);
  });

  return server;
};

mountServer(express());
