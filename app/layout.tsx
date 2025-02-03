import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster, ToastOptions } from "react-hot-toast";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { WrapperWithQuery } from "@/components/wrapper";

const toastOptions: ToastOptions = {
  style: {
    borderRadius: "8px",
    borderColor: "hsl(var(--border))",
    borderWidth: "1px",
    background: "hsl(var(--background))",
    color: "hsl(var(--foreground))",
  },
}

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WrapperWithQuery>
            {children}
          </WrapperWithQuery>

          <Toaster toastOptions={toastOptions} />

          <div className="bottom-4 right-4 absolute">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
