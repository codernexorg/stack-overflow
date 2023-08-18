import { TagController } from "@controller";
import express, { Router } from "express";

export const tagRoutes: Router = express.Router();

const tagController = new TagController();

tagRoutes.route("/").get(tagController.getTags);
