import { Outlet } from "react-router-dom";
import "./Navbar.css";
import LargeNavBar from "./LargeNavBar";
import SmallNavBar from "./SmallNavBar";

const Navbar = () => {
  return (
    <>
      <LargeNavBar />

      <div className='d-flex flex-column justify-content-between small-screen'>
        <main className='page'>
          <Outlet />
        </main>
        <SmallNavBar />
      </div>
    </>
  );
};

export default Navbar;
