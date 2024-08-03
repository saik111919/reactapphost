import { useState } from "react";
import PropTypes from "prop-types";

const useLoader = (initialLoaderState = false) => {
  const [loader, setLoader] = useState(initialLoaderState);

  const LoaderComp = ({ size = "20", color = "gray-200" }) => {
    const loaderSize = size ? `h-${size} w-${size}` : "h-20 w-20";
    const loaderColor = color
      ? `border-${color} border-t-${color}`
      : "border-gray-200 border-t-gray-200";

    return (
      loader && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-55 z-50'>
          <div
            className={`loader ease-linear rounded-full border-8 ${loaderColor} ${loaderSize} animate-spin`}
          ></div>
        </div>
      )
    );
  };

  LoaderComp.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
  };
  return [setLoader, LoaderComp];
};

export default useLoader;
