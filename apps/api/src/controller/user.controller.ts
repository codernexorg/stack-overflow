import { User } from "@entities";
import { Controller, ApiError, requestHandler, hashPassword } from "@helpers";
import { z } from "zod";

export class UserController extends Controller<User> {
  constructor() {
    super(User);
  }
  getUsers = requestHandler(async (req, res, next) => {
    return res.status(200).json(
      await this.repository.find({
        relations: {
          questions: true,
        },
      })
    );
  });

  createUser = requestHandler(
    async (req, res, next) => {
      console.log("Hello");

      try {
        console.log(req.body);

        const hashedPassword = await hashPassword(req.body.password);
        const user = this.repository.create({
          ...req.body,
          password: hashedPassword,
        });

        await this.repository.save(user);
        return res.status(201).json(user);
      } catch (err) {
        return ApiError(err.message, 404, next);
      }
    },
    {
      body: z.object({
        name: z.string({
          required_error: "Name is required",
        }),
        username: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    }
  );
}
