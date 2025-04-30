import { ThemeProvider as BaseThemeProvider } from "next-themes";
import { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <BaseThemeProvider defaultTheme="system" attribute={"class"} enableColorScheme>
      {children}
    </BaseThemeProvider>
  );
};
