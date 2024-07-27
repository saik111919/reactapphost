import React from "react";
import { NavLink } from "react-router-dom";

const SmallNavBar = () => {
  return (
    <>
      <div className='card m-1 showForMobile'>
        <div className='card-body'>
          <ul className='nav nav-pills justify-content-between'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/reactapphost/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/reactapphost/expense'>
                Expense Traker
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/reactapphost/settings'>
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SmallNavBar;
