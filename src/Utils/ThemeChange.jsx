import React, { useEffect, useState } from "react";

const ThemeChange = () => {
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme ? getTheme : "dark");

  function applyTheme(theme) {
    localStorage.setItem("theme", theme);
    const body = document.querySelector("body");
    body.setAttribute("data-bs-theme", theme); // Set the data-bs-theme attribute
  }

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className='form-check form-switch'>
      <input
        className='form-check-input shadow-none'
        type='checkbox'
        id='themeToggle'
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeChange;
