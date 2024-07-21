// Toast.js
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoCloseCircleOutline, IoWarningOutline } from 'react-icons/io5';
import { MdOutlineErrorOutline } from 'react-icons/md';
import './Toast.css'
import PropTypes from 'prop-types';

const Toast = ({ type, message, onClose }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaRegCircleCheck />;
      case 'warning':
        return <IoWarningOutline />;
      case 'error':
        return <MdOutlineErrorOutline />;
      default:
        return null;
    }
  };

  return (
    <div className={`card card-position card-${type}`}>
      <div className="card-body">
        <div className="card-body-container d-flex">
          <div className="card-body-icon">
            {getIcon()}
          </div>
          <div className="card-body-message">{message}</div>
          <div className="ms-auto card-close-btn">
            <IoCloseCircleOutline className="cursor-pointer" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
    type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default Toast;
