import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "longtext" })
  description: string;

  @Column({ nullable: true, type: "longtext" })
  expectation?: string;

  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
