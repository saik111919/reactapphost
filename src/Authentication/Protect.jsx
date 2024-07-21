import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ Component, name, isProtected }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = name;
    if (isProtected) {
      if (!token) {
        navigate("/reactapphost/login");
      }
    }
  }, [name, navigate, token]);

  return <Component />;
};

Protect.propTypes = {
  Component: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
  isProtected: PropTypes.bool.isRequired,
};

export default Protect;
