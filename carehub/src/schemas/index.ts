import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "please enter your email" })
    .email({ message: "please enter a valid email" }),
  password: z.string().min(1, {
    message: "please enter your password",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email().min(1, { message: "please enter your email" }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
  name: z.string().min(1, { message: "please enter your name" }),
  contact: z.string().min(10, { message: "please enter your contact number" }),
  birthdate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
});

export const cookiesSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const tokenSchema = z.string();
