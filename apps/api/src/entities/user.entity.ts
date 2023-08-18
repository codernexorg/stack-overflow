import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "@codernex/types";
import { Question } from "./question.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: false })
  emailVerified?: boolean;

  @Column({
    select: false,
  })
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.User })
  role: UserRole;

  @OneToMany(() => Question, (q) => q.user, { cascade: true })
  questions: Question[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  addQuestion(question: Question) {
    if (this.questions == null) {
      this.questions = new Array<Question>();
    }

    this.questions.push(question);
  }
}
