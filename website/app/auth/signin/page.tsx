import React from "react";
import { CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import LoginError from "@/components/login/login-error";
import CardWelcomeBack from "@/components/login/card-welcome-back";
import LoginCardWrapper from "@/components/login/login-card-wrapper";
import MagicLinkButton from "@/components/login/login-magiclink-button";
import LoginButton from "@/components/login/login-button";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'

type LoginMethod = "magic-link" | "github" | "apple" | "passkey";

const loginMethods = [
  { id: "github", label: "Login with GitHub" },
  { id: "apple", label: "Login with Apple" },
  { id: "passkey", label: "Login with Passkey"  },
];

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <LoginError />
      {session ? (
        <CardWelcomeBack name={session?.user?.name || ""} />
      ) : (
        <LoginCardWrapper>
          <CardContent className="space-y-4 pt-4">
            <MagicLinkButton />
            {loginMethods.map(({ id, label }) => (
              <LoginButton key={id} id={id} label={label} />
            ))}
          </CardContent>
        </LoginCardWrapper>
      )}
      <div className="bottom-4 right-4 absolute">
        <ThemeToggle />
      </div>
    </div>
  );
}
