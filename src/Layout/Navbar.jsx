import { NavLink, Outlet, useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { useEffect, useState } from "react";
import MoneySvg from "../assets/images/MoneySvg";

const Navbar = () => {
  const navigate = useNavigate();
  const getTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(getTheme ? getTheme : "dark");

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function applyTheme(theme) {
    localStorage.setItem("theme", theme);
    const body = document.querySelector("body");
    body.setAttribute("data-bs-theme", theme); // Set the data-bs-theme attribute
  }

  function handleThemeChange(selectedTheme) {
    setTheme(selectedTheme);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/reactapphost/login");
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/reactapphost/'>
            <MoneySvg />
          </NavLink>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24px'
              viewBox='0 -960 960 960'
              width='24px'
              fill='inherit'
            >
              <path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z' />
            </svg>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {routes().map(
                (route, index) =>
                  route.isHeader && (
                    <li className='nav-item' key={index}>
                      <NavLink className='nav-link active' to={route.path}>
                        {route.name}
                      </NavLink>
                    </li>
                  )
              )}
            </ul>
            <div className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownTheme'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Theme
              </a>
              <ul
                className='dropdown-menu dropdown-menu-start dropdown-menu-lg-end'
                aria-labelledby='navbarDropdownTheme'
              >
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => handleThemeChange("light")}
                  >
                    Light
                  </button>
                </li>
                <li>
                  <button
                    className='dropdown-item'
                    onClick={() => handleThemeChange("dark")}
                  >
                    Dark
                  </button>
                </li>
              </ul>
            </div>
            <div className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdownLogout'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 -960 960 960'
                  width='24px'
                  fill='inherit'
                >
                  <path d='M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z' />
                </svg>
              </a>
              <ul
                className='dropdown-menu dropdown-menu-start dropdown-menu-lg-end'
                aria-labelledby='navbarDropdownLogout'
              >
                <li>
                  <a className='dropdown-item' href='#' onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main className='page'>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
