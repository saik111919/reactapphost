import { useEffect, useState } from "react";

const useTheme = () => {
  const getTheme = () => localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(getTheme());

  const applyTheme = (theme) => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-bs-theme", theme);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return [theme, toggleTheme];
};

export default useTheme;
