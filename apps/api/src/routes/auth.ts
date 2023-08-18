import express, { Router } from "express";
import { AuthController } from "@controller";

export const authRoutes = express.Router() as Router;

const authController = new AuthController();

authRoutes.post("/login", authController.login);
