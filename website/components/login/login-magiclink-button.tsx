"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MagicLinkButton({ signInFunction }: { signInFunction: any }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Email:", email);
    try {
      signInFunction("email", { email });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="mb-4"
      />
      <Button
        type="submit"
        className="w-full flex justify-center items-center relative transition-all duration-500"
      >
        <span
          className={`transition-opacity flex flex-row duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Mail className="mr-2 my-auto h-4 w-4" />
          <p>Send Magic Link</p>
        </span>
        {isLoading && <Loader2 className="absolute h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
}
