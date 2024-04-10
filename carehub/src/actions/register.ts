"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, contact, birthdate } = validatedFields.data;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("contactNo", contact);
  formData.append("birthDate", birthdate.toISOString().split("T")[0]);

  await fetch("http://localhost:18080/auth/register", {
    method: "POST",
    body: formData,
  });

  return { success: "User Created" };
};
