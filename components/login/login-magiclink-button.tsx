"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react";

export default function MagicLinkButton() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function Login(email: string) {
    setIsLoading(true);

    try {
      await signIn('magic-link', { email });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="email"
          type="email"
          placeholder="johndoe@example.com"
          className="pl-10"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button
        className="w-full flex justify-center items-center relative transition-all duration-500"
        onClick={() => Login('magic-link')}
        disabled={isLoading !== false}
      >
        <span className={`transition-opacity flex flex-row duration-300 ${isLoading === true ? 'opacity-0' : 'opacity-100'}`}>
          <Mail className="mr-2 my-auto h-4 w-4" />
          <p>Send Magic Link</p>
        </span>
        {isLoading === true && (
          <Loader2 className="absolute h-4 w-4 animate-spin" />
        )}
      </Button>
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
    </div>
  );
}
