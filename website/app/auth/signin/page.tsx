import React from "react";
import { Github, Loader2, Mail, Apple, KeyRound } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { auth } from "@/auth";
import { signIn as passkeySignIn } from "next-auth/webauthn";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import LoginButton from "@/components/login/login-button";
import MagicLinkButton from "@/components/login/login-magiclink-button";
import { prisma } from "@/prisma";
import CardWelcomeBack from "@/components/login/card-welcome-back";
import LoginError from "@/components/login/login-error";
import LoginCardWrapper from "@/components/login/login-card-wrapper";
import { redirect } from "next/navigation";

type LoginMethod = "magic-link" | "github" | "apple" | "passkey";

const loginMethods = [
  { id: "github", label: "Login with GitHub", icon: Github },
  { id: "apple", label: "Login with Apple", icon: Apple },
  { id: "passkey", label: "Login with Passkey", icon: KeyRound },
] as const;

export default async function Page() {
  const session = await auth();

  //const [email, setEmail] = useState("");
  //const [error, setError] = useState<string | null>(null);

  //const searchParams = new URLSearchParams(window.location.search);
  //const errorParam = searchParams.get("error");
  //   if (errorParam) {
  //     setError(errorParam);
  //   }

  if (session) {
    const checkSuspensionStatus = async () => {
      try {
        const isUserSuspended = await prisma.user.findUnique({
          where: {
            email: session?.user?.email || "",
          },
          select: {
            suspended: true,
          },
        });

        if (isUserSuspended) {
          //setError("UserSuspended");
          await signOut({ redirect: false });
        } else {
          setTimeout(() => {
            redirect("/dashboard");
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking suspension status:", error);
      }
    };
    checkSuspensionStatus();
  }

  const handleLogin = async (method: LoginMethod) => {
    //setIsLoading(method);
    // try {
    //   if (method === "magic-link") {
    //     await signIn("resend", { email });
    //   } else if (method === "passkey") {
    //     await passkeySignIn("passkey");
    //   } else {
    //     await signIn(method);
    //   }
    // } catch (error) {
    //   console.error(`Error during ${method} login:`, error);
    // } finally {
    //   if (method == "passkey" || method == "magic-link") {
    //     //setIsLoading(null);
    //   }
    // }
  };

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      {session ? (
        <CardWelcomeBack name={session?.user?.name || ""} />
      ) : (
        <LoginCardWrapper>
          <MagicLinkButton />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/* {loginMethods.map(({ id, label, icon: Icon }) =>
            //LoginButton({ id, label, Icon, handleLogin })
          )} */}
        </LoginCardWrapper>
      )}
      <div className="bottom-4 right-4 absolute">
        <ThemeToggle />
      </div>
    </div>
  );
}
