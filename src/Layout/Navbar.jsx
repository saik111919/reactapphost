import { NavLink, Outlet } from "react-router-dom";
import routes from "../routes/routes";

const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/reactapphost'>
            HI
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
            <span className='navbar-toggler-icon' />
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
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
            </form>
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
