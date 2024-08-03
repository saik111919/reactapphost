import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

const Settings = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className='-m-1'>
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
    </div>
  );
};

export default Settings;
