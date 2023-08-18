"use client";
import "react-quill/dist/quill.snow.css";
import React from "react";
import { useQuestionModal } from "@/hooks/use-question-modal";
import { HeadlessModal } from "./ui/headless-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import Editor from "react-quill";
import { z } from "zod";
import { questionSchema } from "@codernex/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";

interface QuestionModalProps {}

const QuestionModal: React.FC<QuestionModalProps> = ({}) => {
  const { isOpen, onClose } = useQuestionModal();
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
  });

  const { data: session } = useSession();

  console.log(session);

  const onSubmit: SubmitHandler<z.infer<typeof questionSchema>> = (value) => {
    axios
      .post("http://localhost:9000/api/v1/question", value, {
        withCredentials: true,
        headers: {
          Authorization: session?.user.access_token,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <HeadlessModal
      title="Ask a public question"
      description={
        <div className="mt-6 bg-[#1e4462] text-slate-300 p-4 rounded-md space-y-3">
          <h2 className="text-xl font-semibold">Write a good question</h2>
          <p>
            You’re ready to ask a programming-related question and this form
            will help guide you through the process. Looking to ask a
            non-programming question? See the topics here to find a relevant
            site.
          </p>
          <h5 className="mt-2">Steps</h5>
          <ul className="mb-0 ml-6 space-y-1 text-sm list-disc">
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Title</FormLabel>
                <p className="text-sm">
                  Be specific and imagine you’re asking a question to another
                  person.
                </p>
                <FormControl>
                  <Input
                    placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-xl">
                    What are the details of your problem?
                  </FormLabel>
                  <p className="text-sm">
                    Introduce the problem and expand on what you put in the
                    title. Minimum 20 characters.
                  </p>
                  <FormControl>
                    <Editor
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="expectation"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-xl">
                    What did you try and what were you expecting?
                  </FormLabel>
                  <p className="text-sm">
                    Discribe what did you tried and what were you expecting
                  </p>
                  <FormControl>
                    <Editor
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="bg-lightBlue text-slate-100" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </HeadlessModal>
  );
};
export default QuestionModal;
