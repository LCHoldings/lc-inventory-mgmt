"use client"

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Page() {
  const { theme, systemTheme, } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    console.log(theme, systemTheme);

    if (theme == null) {
      setCurrentTheme(systemTheme);
    } else if (theme === "system") {
      setCurrentTheme(systemTheme);
    } else {
      setCurrentTheme(theme);
    }
  }, [theme, systemTheme]);

  return (
    <div className="flex flex-col gap-4 h-screen w-full items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <SignIn appearance={{ baseTheme: currentTheme === "dark" ? dark : undefined }} />
    </div>
  );
}
