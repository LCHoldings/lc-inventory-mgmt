import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme/theme-provider";

import { Toaster } from "@/components/ui/toaster";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <div className="bottom-4 right-4 absolute">
              <ThemeToggle />
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
