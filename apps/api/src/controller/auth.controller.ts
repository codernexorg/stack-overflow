import { User } from "@entities";
import {
  ApiError,
  Controller,
  isPasswordMatch,
  requestHandler,
} from "@helpers";
import { loginSchema } from "@codernex/schema";
import jwt from "jsonwebtoken";
import { santizedEnv } from "env";

export class AuthController extends Controller<User> {
  constructor() {
    super(User);
  }

  login = requestHandler(
    async (req, res, next) => {
      const user = await this.repository.findOne({
        where: {
          username: req.body.username,
        },
        select: {
          password: true,
          id: true,
          email: true,
          username: true,
          name: true,
          role: true,
        },
      });

      if (!user) {
        return ApiError("Invalid Username or Password", 401, next);
      }

      if (!isPasswordMatch(req.body.password, user.password)) {
        return ApiError("Invalid Username or Password", 401, next);
      }

      const token = jwt.sign(
        { sub: user.id, username: user.username, name: user.name },
        santizedEnv.JWT_SECRET
      );

      const { password, ...rest } = user;

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: santizedEnv.NODE_ENV === "production",
          maxAge: 60 * 60 * 1000 * 24 * 7,
          sameSite: "none",
        })
        .status(200)
        .json({
          access_token: token,
          user: rest,
        });
    },
    {
      body: loginSchema,
    }
  );
}
