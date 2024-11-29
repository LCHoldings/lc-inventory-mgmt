"use client";
import { Button } from "../ui/button";
import { Loader2, LucideIcon } from "lucide-react";

import { useState } from "react";

type LoginMethod = "magic-link" | "github" | "apple" | "passkey";

export default function LoginButton({
  id,
  label,
  Icon,
}: {
  id: string;
  label: string;
  Icon: LucideIcon;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function Login() {
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
    <>
      <Button
        key={id}
        variant="outline"
        className="w-full flex justify-center items-center relative"
        onClick={() => Login()}
        disabled={isLoading !== null}
      >
        <span
          className={`transition-opacity flex flex-row duration-300 ${
            isLoading === id ? "opacity-0" : "opacity-100"
          }`}
        >
          <Icon className="mr-2 my-auto h-4 w-4" />
          <p>{label}</p>
        </span>
        {isLoading === id && (
          <Loader2 className="absolute h-4 w-4 animate-spin" />
        )}
      </Button>
    </>
  );
}
