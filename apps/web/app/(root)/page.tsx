"use client";
import QuestionModal from "@/components/QuestionModal";
import { Button } from "@/components/ui/button";
import { Question } from "@/components/ui/question";
import { useQuestionModal } from "@/hooks/use-question-modal";
import axios from "axios";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { IQuestion } from "@codernex/types";

export const metadata: Metadata = {
  title: "Home | Stack Overflow",
  description: "Stack Overflow Home Page",
};
export default function Home() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const { onOpen } = useQuestionModal();

  useEffect(() => {
    axios.get("http://localhost:9000/api/v1/question").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  return (
    <div className="px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Top Questions</h1>
        <Button className="bg-lightBlue text-white" onClick={() => onOpen()}>
          Ask Question
        </Button>
      </div>
      <QuestionModal />

      <div>
        {questions.map((question: any) => {
          return <Question key={question.id} {...question} />;
        })}
      </div>
    </div>
  );
}
