"use server"

import { Button } from "@/components/ui/button";
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import PasskeyLogin from '@/components/passkey-login';

export default async function Home() {
  const session = await auth()
  console.log(session)
  return (
    <div>
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <PasskeyLogin />
    </div>
  );
}
