import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import lottie from "lottie-web";
import animationData from "../assets/images/Loading V4/loadingV4.json"; // Replace with your animation JSON file path

const Loader = ({ loader }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (loader) {
      lottie.loadAnimation({
        container: containerRef.current,
        animationData: animationData,
        renderer: "svg", // Optional: Change the renderer to 'canvas' or 'html' as needed
        loop: true, // Optional: Set animation loop
        autoplay: true, // Optional: Auto-play animation
      });
    }
  }, [loader]);

  return (
    loader && (
      <div className='loader'>
        <div ref={containerRef} className='animation-container' />
      </div>
    )
  );
};

Loader.propTypes = {
  loader: PropTypes.bool.isRequired,
};

export default Loader;