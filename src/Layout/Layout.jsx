import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import "./layout.css";

const Layout = () => {
  return (
    <div className='flex flex-col h-dvh'>
      <NavBar />
      <Suspense
        fallback={
          <div className='text-center w-full h-screen flex items-center justify-center'>
            <div className='loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20'></div>
          </div>
        }
      >
        <main className='flex-grow-1 max-h-svh overflow-x-hidden overflow-y-auto px-1'>
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};

export default Layout;
