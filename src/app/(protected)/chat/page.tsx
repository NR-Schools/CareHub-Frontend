import { cookies } from "next/headers";
import { ChatLayout } from "./chat-layout";
import { CookiesSchema } from "@/schemas";

export default async function Home({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const cookieStore = cookies().get("session");
  const validatedUserType = CookiesSchema.safeParse(cookieStore);
  const emailStore = cookies().get("email");
  const validatedEmail = CookiesSchema.safeParse(emailStore);
  const sessionCookie = validatedUserType.success ? validatedUserType.data : "";
  const emailCookie = validatedEmail.success ? validatedEmail.data : "";
  const res = await fetch(
    `${process.env.DATABASE_URL}/chat/history?otherUserEmail=${searchParams.email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionCookie.value}`,
      },
    }
  );

  const data = await res.json();
  return (
    <main className="flex h-[calc(100dvh)] flex-col items-center justify-center p-4 md:px-24 py-32 gap-4">
      <div className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex bg-white">
        <ChatLayout
          data={data}
          email={emailCookie.value}
          cookie={sessionCookie.value}
        />
      </div>
    </main>
  );
}
