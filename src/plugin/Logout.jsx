import PropTypes from "prop-types";

const Logout = ({
  tag: Tag = "button",
  text = "Logout",
  className = "",
  onClick,
}) => {
  return (
    <Tag className={className} onClick={onClick}>
      {text}
    </Tag>
  );
};

// PropTypes validation
Logout.propTypes = {
  tag: PropTypes.elementType,
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Logout;
