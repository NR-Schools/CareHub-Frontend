import { cookiesSchema, userSchema } from "@/schemas";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET() {
  const cookie: unknown = cookies().get("session");
  const validatedCookie = cookiesSchema.safeParse(cookie);
  const res = await fetch(`${process.env.DATABASE_URL}/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${
        validatedCookie.success ? validatedCookie.data.value : ""
      }`,
    },
  });
  const data = await res.json();
  const validatedUser = userSchema.safeParse(data);
  return NextResponse.json(validatedUser.success ? validatedUser.data : null);
}
