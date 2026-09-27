"use client";

import { createContext, startTransition, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "fr" | "en";
type Theme = "dark" | "light";

type SitePreferencesValue = {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

const SitePreferencesContext = createContext<SitePreferencesValue | null>(null);

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    startTransition(() => {
      if (savedLanguage === "fr" || savedLanguage === "en") setLanguage(savedLanguage);
      if (savedTheme === "dark" || savedTheme === "light") setTheme(savedTheme);
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("portfolio-language", language);
  }, [language]);

  return (
    <SitePreferencesContext.Provider
      value={{
        language,
        theme,
        toggleLanguage: () => setLanguage((current) => current === "fr" ? "en" : "fr"),
        toggleTheme: () => setTheme((current) => current === "dark" ? "light" : "dark"),
      }}
    >
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  return context;
}
