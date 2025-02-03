import { themeQuartz } from "ag-grid-community";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Important
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// AG Grid Theme
export const lcTheme = themeQuartz
  .withParams({
    accentColor: "hsl(var(--accent))",
    backgroundColor: "hsl(var(--card))",
    borderColor: "hsl(var(--border))",
    browserColorScheme: "dark",
    chromeBackgroundColor: "hsl(var(--background))",
    columnBorder: false,
    foregroundColor: "hsl(var(--card-foreground))",
    headerBackgroundColor: "hsl(var(--muted))",
    headerFontFamily: "inherit",
    headerFontSize: 14,
    rowBorder: true,
    sidePanelBorder: true,
    wrapperBorder: true,
  });

// Organization Role Names
export function getRoleName(role: string | null | undefined) {
  if (!role) return "Member"
  switch (role) {
    case "org:it_admin":
      return "IT Administrator"
    case "org:it_staff":
      return "IT Staff"
    case "org:member":
      return "Member"
    case "org:admin":
      return "Organization Admin"
    default:
      return "Member"
  }
}