"use client";
import "../../globals.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema } from "@codernex/schema";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export const metadata = {
  title: "Sign In",
  description: "Sign IN On Stack Overflow",
};

export default function SignIn() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
    value
  ) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: value.username,
      password: value.password,
    });

    if (res?.ok) {
      router.push("/", { scroll: false });
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-800 text-slate-400">
      <Form {...form}>
        <form
          className="flex flex-col items-center justify-center w-3/12 space-y-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-xl font-medium">Login</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter Your Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl className="w-full">
                  <Input
                    type="password"
                    placeholder="Enter Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="border border-primary text-secondary"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
