import { NavLink, Outlet, useNavigate } from "react-router-dom";
import routes from "../routes/routes";
import { useEffect, useState } from "react";
import MoneySvg from "../assets/images/MoneySvg";
import MenuSvg from "../assets/images/Menu V2/MenuSvg";
import ThemeSvg from "../assets/images/ThemeSvg";
import UserSvg from "../assets/images/UserSvg";

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

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
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
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
          >
            <MenuSvg />
          </button>
          <div
            className='offcanvas offcanvas-start'
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
          >
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                Menu
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
              ></button>
            </div>
            <div className='offcanvas-body'>
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
              <div className='d-flex flex-md-row flex-sm-column'>
                <div className='nav-item me-md-2 me-0'>
                  <span
                    className='btn border-0'
                    onClick={toggleTheme}
                    aria-label='Toggle Theme'
                  >
                    <ThemeSvg />
                  </span>
                </div>
                <div className='nav-item dropdown pt-1'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='navbarDropdownLogout'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <UserSvg />
                  </a>
                  <ul
                    className='dropdown-menu dropdown-menu-start dropdown-menu-lg-end'
                    aria-labelledby='navbarDropdownLogout'
                  >
                    <li>
                      <a
                        className='dropdown-item'
                        href='#'
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
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
