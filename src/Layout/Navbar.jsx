import { NavLink, useLocation } from "react-router-dom";
import routes from "../routes/routes";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";

const NavBar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <nav className='bg-primary w-full fixed bottom-0 lg:sticky lg:top-0 lg:bottom-auto'>
      <div className='lg:flex justify-between w-screen'>
        <div className='lg:flex'>
          <h1 className='self-center lg:inline hidden p-3'>
            <NavLink to={"/reactapphost/"}>KARON</NavLink>
          </h1>
          <ul className='flex gap-0.5 lg:justify-normal justify-between'>
            {routes.map(
              (route, index) =>
                route.isHeader && (
                  <li key={index} className='flex'>
                    <NavLink
                      key={index}
                      to={route.path}
                      className={`p-3 self-center ${
                        location.pathname === route.path
                          ? "bg-primary shadow-md text-light lg:border-b-2 lg:border-t-0 border-t-2"
                          : "hover:text-white hover:shadow-lg hover:border-b-2 hover:border-b-black"
                      }`}
                    >
                      {route.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        <ul className='list-none lg:flex pe-3 hidden'>
          <li className='relative self-center'>
            <button
              onClick={toggleDropdown}
              onMouseEnter={toggleDropdown}
              className='flex items-center gap-1 px-4 py-2 text-sm font-medium text-light rounded-lg focus:outline-none'
            >
              {/* <img src='' alt='img' width='24' height='24' /> */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                className='bi bi-person-circle'
                viewBox='0 0 16 16'
              >
                <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                <path
                  fillRule='evenodd'
                  d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1'
                />
              </svg>
              Username
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className={`bi bi-chevron-right w-4 h-4 mt-1 ease-in-out transform transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'
                />
              </svg>
            </button>
          </li>
          {isDropdownOpen && (
            <>
              <li className='self-center'>
                <NavLink
                  to='/reactapphost/login'
                  className='block px-3 py-3 text-sm text-light border-b bg-blue-700 border-white hover:bg-blue-600'
                  onMouseLeave={toggleDropdown}
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  <div className='flex align-middle gap-1 justify-between'>
                    <BiLogOut className='self-center mt-1' />
                    Logout
                  </div>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
