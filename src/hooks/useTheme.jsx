import { useEffect, useState } from "react";

const useTheme = () => {
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme ? getTheme : "dark");

  const applyTheme = (theme) => {
    localStorage.setItem("theme", theme);
    const body = document.querySelector("body");
    body.setAttribute("data-bs-theme", theme); // Set the data-bs-theme attribute
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
