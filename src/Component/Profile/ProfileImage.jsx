import { useState } from "react";

const ProfileImage = ({ image, onImageChange }) => {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";
  };

  return (
    <div className='mb-4 text-center'>
      <label className='form-label'>Profile Image</label>
      <div className='mb-3'>
        <img
          src={image || "https://via.placeholder.com/150"}
          alt='Profile'
          className='img-thumbnail rounded-circle object-fit-cover'
          width='150'
          height='150'
          onError={handleImageError}
        />
      </div>
      <input
        type='file'
        accept='image/*'
        onChange={onImageChange}
        className='form-control'
        style={{ display: "inline-block", width: "auto" }}
      />
    </div>
  );
};

export default ProfileImage;
