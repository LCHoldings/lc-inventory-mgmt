"use client"

import React from "react";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <SignUp />
    </div>
  );
}
