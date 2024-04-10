"use server";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { cookies } from "next/headers";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const res = await fetch("http://localhost:18080/auth/login", {
    method: "POST",
    body: formData,
  });
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const data = await res.json();
  const token = await data.token;
  cookies().set("session", token, { expires, httpOnly: true });
  return { success: "Email sent" };
};
