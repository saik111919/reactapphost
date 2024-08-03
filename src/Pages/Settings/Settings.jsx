import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";
import Logout from "../../plugin/Logout";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [theme, toggleTheme] = useTheme();
  const navigate = useNavigate();

  return (
    <div className='-m-1'>
      <div className='flex flex-col justify-between'>
        <div className='w-full p-4 flex justify-between shadow-sm'>
          <h1 className='text-2xl font-mono'>Settings</h1>
          <FiSettings className='h-7 w-7 transition-transform duration-300 ease-in-out transform hover:rotate-180 hover:text-blue-500' />
        </div>
        <div
          className='flex justify-between items-center p-4 rounded-none shadow-md '
          onClick={toggleTheme}
        >
          <span className='fs-5 text-lg font-medium'>Theme</span>
          <div className='flex items-center'>
            <span className='text-sm mr-2 flex align-middle cursor-pointer shadow-xl '>
              {theme === "dark" ? (
                <FaMoon className='text-light text-2xl' />
              ) : (
                <FaSun className='text-yellow-500 text-2xl' />
              )}
            </span>
          </div>
        </div>
        <div className='absolute bottom-16 w-full'>
          <Logout
            tag='button'
            className='bg-danger p-3 text-light w-full'
            onClick={() => {
              localStorage.clear();
              navigate("/reactapphost/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
