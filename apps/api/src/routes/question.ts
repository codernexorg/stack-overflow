import { QuestionController } from "@controller";
import { isAuthenticated, isAuthorized } from "@middleware";
import express from "express";

const questionController = new QuestionController();

export const questionRoutes = express.Router() as express.Router;

questionRoutes
  .route("/")
  .get(questionController.getQuestions)
  .post(isAuthenticated, isAuthorized, questionController.createQuestion);
