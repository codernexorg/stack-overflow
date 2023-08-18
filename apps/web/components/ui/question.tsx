import { IQuestion } from "@codernex/types";

export const Question = ({ ...question }: IQuestion) => {
  return (
    <div className="flex space-x-3 py-3 border border-slate-700 pl-20 pr-4">
      <div className="w-72 border border-red-300"></div>
      <div>
        <h1 className="text-lightBlue">{question.title}</h1>
      </div>
    </div>
  );
};
