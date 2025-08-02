import z from "zod";

export const signInFormSchema = z.object({
  name: z.string().optional(), // it's only added to be easy switch between sign in and sign up
  email: z.email({ pattern: z.regexes.html5Email }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 3 characters"),
  email: z.email({ pattern: z.regexes.html5Email }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
