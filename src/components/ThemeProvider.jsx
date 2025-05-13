import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme !== null) {
        return savedTheme === "dark";
      }
      // If no saved preference, check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // ..
  // Function to update the DOM and localStorage
  const applyTheme = (dark) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      applyTheme(newTheme);
      return newTheme;
    });
  };

  // Apply theme on mount and when isDarkMode changes
  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only update if there's no saved preference
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
