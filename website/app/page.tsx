"use server"

import { auth } from "@/auth"
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
