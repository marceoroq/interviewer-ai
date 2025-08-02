"use client";

import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFieldInput } from "@/components/shared/auth/form-field-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { APP_NAME } from "@/constants";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators";

export const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const isSignIn = type === "sign-in";
  const formSchema = isSignIn ? signInFormSchema : signUpFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col items-center gap-4">
        <div className="flex items-center justify-center gap-2">
          <Image src="/logo.svg" width={38} height={32} alt="app logo" />
          <h2>{APP_NAME}</h2>
        </div>
        <CardTitle className="flex items-center justify-center gap-4">
          Practice job interview with AI
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {!isSignIn && (
              <FormFieldInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            )}
            <FormFieldInput
              control={form.control}
              name="email"
              label="Email"
              autoComplete="email"
              placeholder="Enter your email"
            />
            <FormFieldInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              type="password"
            />
            <Button type="submit">{isSignIn ? "Sign in" : "Create an Account"}</Button>
          </form>
        </Form>
        <p className="text-sm text-center">
          {isSignIn ? "No account yet?" : "Already have an account?"}
          <Link className="font-semibold ml-1" href={isSignIn ? "/sign-up" : "/sign-in"}>
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
