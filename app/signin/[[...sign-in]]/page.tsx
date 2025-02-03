"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SignIn } from "@clerk/nextjs";
import { Terminal } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <Alert className="w-full max-w-[400px]">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Demo Credentials</AlertTitle>
        <AlertDescription>
          Use these credentials to log in. If they dont work, someone changed them :/
          <br />
          You need your own account to be able to edit or create data. But you can use these credentials to test the app.
          <br /><br />
          <code>Email: admin@hackclub.se</code>
          <br />
          <code>Password: HACKclub12</code>
        </AlertDescription>
      </Alert>
      <SignIn />
    </div>
  );
}
