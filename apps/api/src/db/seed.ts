import "reflect-metadata";
import { Tag } from "@entities";
import { appDataSource } from "orm.config";

export const seed = async () => {
  const tags = [
    "javascript",
    "typescript",
    "aws",
    "scala",
    "next.js",
    "react.js",
    "node.js",
    "react",
    "next",
    "node",
    "web",
    "http",
    "cors",
    "java",
    "c++",
    "c#",
    "golang",
    "ruby",
    "python",
    "webpack",
    "eslint",
    "prettier",
    "rust",
    "php",
    "laravel",
    "babel",
  ];

  const queryRunner = appDataSource.createQueryRunner();

  // lets now open a new transaction:
  await queryRunner.startTransaction();

  try {
    await Promise.all(
      tags.map(async (tag) => {
        const data = queryRunner.manager.create(Tag, {
          name: tag,
        });

        return await queryRunner.manager.save(data);
      })
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};
