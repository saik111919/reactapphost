import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ links }) => (
  <div className='card mb-2'>
    <nav aria-label='breadcrumb' className='card-body'>
      <ol className='breadcrumb m-0'>
        {links.map((link, index) => (
          <li className='breadcrumb-item' key={index}>
            {link}
          </li>
        ))}
      </ol>
    </nav>
  </div>
);

export default Breadcrumbs;
