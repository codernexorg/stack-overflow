import express from "express";
import { UserController } from "@controller";
export const userRoutes = express.Router() as express.Router;

const userController = new UserController();

userRoutes
  .route("/")
  .get(userController.getUsers)
  .post(userController.createUser);
