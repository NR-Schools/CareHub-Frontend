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

export const ProfileCreationSchema = z.object({
  provider_name: z.string().min(1, { 
    message: "please enter your provider name" }),
  provider_location: z.string().min(1, {
    message: "please enter your location",
  }),
  provider_description: z.string().min(1, {
    message: "please enter your description",
  }),
  provider_services: z.string().min(1, {
    message: "please enter your services",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email().min(1, { message: "please enter your email" }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters",
  }),
  name: z.string().min(1, { message: "please enter your name" }),
  contact: z.string().min(11, { message: "please enter your contact number" }),
  birthdate: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  photoBytes: z.optional(z.string()),
  userServiceCare: z.optional(z.boolean()),
});

export const cookiesSchema = z.object({
  name: z.string(),
  value: z.string(),
});

export const tokenSchema = z.string();

export const userSchema = z.object({
  email: z.string(),
  name: z.string(),
  contactNo: z.string(),
  birthDate: z.string(),
  photoId: z.null().or(z.string()),
  userServiceCare: z.null().or(z.boolean()),
});
