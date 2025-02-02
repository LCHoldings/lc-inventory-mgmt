"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { lcThemeDark, lcThemeLight } from "@/lib/clerkTheme";

const queryClient = new QueryClient();

export function WrapperWithQuery(props: { children: React.ReactNode }) {
    const { theme, systemTheme, } = useTheme();
    const [currentTheme, setCurrentTheme] = useState(theme);

    useEffect(() => {
        if (theme == null) {
            setCurrentTheme(systemTheme);
        } else if (theme === "system") {
            setCurrentTheme(systemTheme);
        } else {
            setCurrentTheme(theme);
        }
    }, [theme, systemTheme]);

    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider
                appearance={{
                    baseTheme: currentTheme === "dark" ? lcThemeDark : lcThemeLight,
                }}
            >
                {props.children}
            </ClerkProvider>
        </QueryClientProvider>
    );
}