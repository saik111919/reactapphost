// import { useState } from "react";

// const ProfileName = ({ name, onNameChange, onKeyEnter }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className='d-flex align-items-center mb-4'>
//       <label className='form-label me-3 mb-0' style={{ width: "150px" }}>
//         Profile Name
//       </label>
//       {isEditing ? (
//         <input
//           type='text'
//           className='form-control'
//           value={name}
//           onChange={(e) => onNameChange(e.target.value)}
//           onBlur={() => setIsEditing(false)}
//           onKeyDownCapture={(e) => onKeyEnter({ name: e.target.value })}
//           autoFocus
//         />
//       ) : (
//         <p
//           className='form-control mb-0'
//           onClick={() => setIsEditing(true)}
//           style={{ cursor: "pointer" }}
//           title='Click to edit'
//         >
//           {name}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProfileName;

import { useState } from "react";
import PropTypes from "prop-types";

const ProfileName = ({ name, onNameChange, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const handleSave = () => {
    onSave(inputValue);
    setIsEditing(false);
    onNameChange({ name: inputValue });
  };

  const handleCancel = () => {
    setInputValue(name); // Revert to the original name
    setIsEditing(false);
  };

  return (
    <div className='d-flex align-items-center mb-4'>
      <label className='form-label me-3 mb-0' style={{ width: "150px" }}>
        Profile Name
      </label>
      {isEditing ? (
        <div className='d-flex align-items-center'>
          <input
            type='text'
            className='form-control me-2'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
          />
          <button className='btn btn-primary me-2' onClick={handleSave}>
            Save
          </button>
          <button className='btn btn-secondary' onClick={handleCancel}>
            Cancel
          </button>
        </div>
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

ProfileName.propTypes = {
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProfileName;
