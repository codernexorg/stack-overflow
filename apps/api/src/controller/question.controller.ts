import { questionSchema } from "@codernex/schema";
import { Question, User } from "@entities";
import { ApiError, Controller, requestHandler } from "@helpers";
import { appDataSource } from "orm.config";
import { Repository } from "typeorm";

export class QuestionController extends Controller<Question> {
  userRepository: Repository<User> = appDataSource.getRepository(User);
  constructor() {
    super(Question);
  }

  getQuestions = requestHandler(async (req, res, next) => {
    res.status(200).json(
      await this.repository.find({
        relations: {
          user: true,
        },
      })
    );
  });

  createQuestion = requestHandler(
    async (req, res, next) => {
      const user = req.user;

      if (!user) {
        return ApiError("User not found", 404, next);
      }

      const question = this.repository.create(req.body);

      user.addQuestion(question);
      await this.userRepository.save(user);
      await this.repository.save(question);

      res.status(200).json(question);
    },
    {
      body: questionSchema,
    }
  );
}
