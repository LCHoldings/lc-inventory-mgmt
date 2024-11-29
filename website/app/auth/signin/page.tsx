import React from "react"
import { CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import LoginError from "@/components/login/login-error";
import CardWelcomeBack from "@/components/login/card-welcome-back";
import LoginCardWrapper from "@/components/login/login-card-wrapper";
import MagicLinkButton from "@/components/login/login-magiclink-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function Page() {

  const session = await auth();

     if (session) {
       setTimeout(() => {
        redirect('/dashboard')
       }, 2000)
      }

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <LoginError />
      {(session) ? (
        <CardWelcomeBack name={session?.user?.name || ""} />
      ) : (
        <LoginCardWrapper>
          <CardContent className="space-y-4 pt-4">
            <MagicLinkButton />
            {/* {loginMethods.map(({ id, label, icon: Icon }) => (
              
            ))} */}
          </CardContent>
        </LoginCardWrapper>
      )}
      <div className="bottom-4 right-4 absolute">
        <ThemeToggle />
      </div>
    </div>
  )
}