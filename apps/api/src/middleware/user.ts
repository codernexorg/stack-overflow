import { UserController } from "@controller";
import { ApiError, requestHandler } from "@helpers";
import { santizedEnv } from "env";
import jwt from "jsonwebtoken";

const userController = new UserController();

export const isAuthenticated = requestHandler(async (req, _res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
      return ApiError("No valid authorization token", 401, next);
    }

    const decodedData = jwt.verify(token, santizedEnv.JWT_SECRET);

    if (!decodedData) {
      return ApiError("No valid user", 401, next);
    }
    const user = await userController.repository.findOne({
      where:
        typeof decodedData === "object"
          ? { username: decodedData.username }
          : {},
    });

    if (!user) {
      return ApiError("No valid user", 401, next);
    }

    req.user = user;

    return next();
  } catch (err) {
    return ApiError(err.message, 404, next);
  }
});

export const isAuthorized = requestHandler(async (req, _res, next) => {
  try {
    if (!req.user) {
      return ApiError("UnAuthorized", 401, next);
    }

    return next();
  } catch (err) {
    return ApiError(err.message, 404, next);
  }
});
