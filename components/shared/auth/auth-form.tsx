"use client";

import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { auth, googleProvider } from "@/lib/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { signInAction, signInWithGoogleAction, signUpAction } from "@/lib/actions/auth.actions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormFieldInput } from "@/components/shared/auth/form-field-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { APP_NAME } from "@/constants";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators";

export const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const formSchema = isSignIn ? signInFormSchema : signUpFormSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignIn(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredentials.user.getIdToken();

      if (!idToken) {
        toast.error("Failed to sign in. Please try again.");
        return;
      }

      const result = await signInAction({ idToken });

      if (!result?.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/invalid-credential") {
        toast.error("Invalid email or password");
        return;
      }

      toast.error("Failed to sign in. Please try again.");
    }
  }

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

      const response = await signUpAction({
        uid: userCredentials.user.uid,
        name: name!,
        email,
      });

      if (!response?.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      router.push("/sign-in");
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Try with another email or sign in.");
        return;
      }
      toast.error("Failed to sign up. Please try again.");
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSignIn) {
      await handleSignIn(values);
    } else {
      await handleSignUp(values);
    }
  }

  async function handleSignInWithGoogle() {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const idToken = await userCredentials.user.getIdToken();
      const result = await signInWithGoogleAction({ idToken });

      if (!result?.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      }
    }
  }

  return (
    <Card className="w-full max-w-sm mx-4">
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
            <Button className="cursor-pointer" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <Button className="cursor-pointer" type="submit" onClick={handleSignInWithGoogle}>
          Sign in with Google
        </Button>
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
