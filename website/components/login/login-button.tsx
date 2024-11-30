"use client";
import React from 'react';
import { Button } from "../ui/button";
import { Github, Loader2, Mail, Apple, KeyRound } from 'lucide-react'
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginButton({
  id,
  label,
}: {
  id: string;
  label: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const classes = "mr-2 my-auto h-4 w-4"
  async function Login() {
    setIsLoading(true);

    try {
      await signIn(id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  let icon
  switch (id) {
    case "github":
      icon = <Github className={classes} />
      break;
    case "apple":
      icon = <Apple className={classes} />
      break;
    case "passkey":
      icon = <KeyRound className={classes} />
      break;
    default:
      break;
  }
  
  return (
    <>
      <Button
        key={id}
        variant="outline"
        className="w-full flex justify-center items-center relative"
        onClick={() => Login()}
        disabled={isLoading}
      >
        <span
          className={`transition-opacity flex flex-row duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {icon}
          <p>{label}</p>
        </span>
        {isLoading && <Loader2 className="absolute h-4 w-4 animate-spin" />}
      </Button>
    </>
  );
}
