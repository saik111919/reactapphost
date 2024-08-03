import { useEffect, useState } from "react";

const useTheme = () => {
  // Get the saved theme from localStorage or default to "dark"
  const getTheme = () => localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(getTheme());

  // Apply the theme to the body element
  const applyTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-bs-theme", theme);
  };

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Effect to apply the theme whenever it changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
