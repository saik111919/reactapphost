import { IoCloseCircleOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineErrorOutline } from "react-icons/md";
import "./Toast.css";
import PropTypes from "prop-types";
import { BiInfoCircle } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";

const Toast = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaRegCircleCheck className='h-5 w-5' />;
      case "warning":
        return <IoWarningOutline className='h-5 w-5' />;
      case "error":
        return <MdOutlineErrorOutline className='h-5 w-5' />;
      case "info":
        return <BiInfoCircle className='h-5 w-5' />;
      default:
        return null;
    }
  };

  return (
    <div className={`card card-position card-${type}`}>
      <div className='card-body'>
        <div className='card-body-container d-flex'>
          <div className='card-body-icon'>{getIcon()}</div>
          <div className='card-body-message'>{message}</div>
          <div className='ms-auto card-close-btn'>
            <IoCloseCircleOutline
              className='cursor-pointer h-6 w-6 hover:text-black hover:shadow-lg rounded-2xl'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
  message: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
