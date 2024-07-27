import { useState } from "react";

const ProfileName = ({ name, onNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='d-flex align-items-center mb-4'>
      <label className='form-label me-3 mb-0' style={{ width: "150px" }}>
        Profile Name
      </label>
      {isEditing ? (
        <input
          type='text'
          className='form-control'
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <p
          className='form-control mb-0'
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer" }}
          title='Click to edit'
        >
          {name}
        </p>
      )}
    </div>
  );
};

export default ProfileName;
