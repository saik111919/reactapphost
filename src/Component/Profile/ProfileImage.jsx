import { useState } from "react";
import PropTypes from "prop-types";

const predefinedImages = [
  "https://www.w3schools.com/w3images/avatar2.png",
  "https://www.w3schools.com/w3images/avatar5.png",
  "https://www.w3schools.com/w3images/avatar6.png",
  "https://www.w3schools.com/w3images/avatar1.png",
];

const ProfileImage = ({ image, onImageChange }) => {
  const [showModal, setShowModal] = useState(false);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";
  };

  const handleImageSelect = (selectedImage) => {
    if (selectedImage) {
      onImageChange(selectedImage);
    } else {
      console.error("onImageChange is not a function");
    }
    setShowModal(false);
  };

  return (
    <div className='mb-4 text-center'>
      <label className='form-label'>Profile Image</label>
      <div
        className='mb-3'
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={image || "https://via.placeholder.com/150"}
          alt='Profile'
          className='img-thumbnail rounded-circle object-fit-cover'
          width='150'
          height='150'
          onError={handleImageError}
        />
      </div>

      {showModal && (
        <div className='modal fade show d-block' tabIndex='-1' role='dialog'>
          <div className='modal-dialog modal-dialog-centered' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Select Profile Image</h5>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className='modal-body'>
                <div className='d-flex flex-wrap gap-2 justify-content-center'>
                  {predefinedImages.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt='Predefined'
                      className='img-thumbnail rounded-circle'
                      width='100'
                      height='100'
                      style={{ cursor: "pointer" }}
                      onClick={() => handleImageSelect(img)}
                    />
                  ))}
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && <div className='modal-backdrop fade show'></div>}
    </div>
  );
};

ProfileImage.propTypes = {
  image: PropTypes.string,
  onImageChange: PropTypes.func.isRequired,
};

export default ProfileImage;
