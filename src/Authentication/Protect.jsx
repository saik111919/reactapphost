import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ Component, name }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = name;
    if (!token) {
      navigate("/login");
    }
  }, [name, navigate, token]);

  return <Component />;
};

Protect.propTypes = {
  Component: PropTypes.elementType.isRequired,
  name: PropTypes.string.isRequired,
};

export default Protect;
