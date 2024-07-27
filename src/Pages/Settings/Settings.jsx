// import React, { useState } from "react";
// import ThemeChange from "../../Utils/ThemeChange";
// import { Link, useNavigate } from "react-router-dom";

// const Settings = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState("John Doe");
//   const [image, setImage] = useState(null); // State to hold the profile image
//   const navigate = useNavigate();

//   const handleNameClick = () => {
//     setIsEditing(true);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleNameBlur = () => {
//     setIsEditing(false);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/reactapphost/login");
//   };

//   const breadcrumbs = [
//     <Link key='1' to='/reactapphost/'>
//       Home
//     </Link>,
//     <span key='3' className='text-primary'>
//       Settings
//     </span>,
//   ];

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageError = () => {
//     setImgSrc("https://via.placeholder.com/150");
//   };

//   return (
//     <>
//       <div className='card mb-2'>
//         <nav aria-label='breadcrumb' className='card-body'>
//           <ol className='breadcrumb m-0'>
//             {breadcrumbs.map((breadcrumb, index) => (
//               <li className='breadcrumb-item' key={index}>
//                 {breadcrumb}
//               </li>
//             ))}
//           </ol>
//         </nav>
//       </div>
//       <div className='container mt-1 px-0'>
//         <div className='card shadow-sm'>
//           <div className='card-header'>
//             <h2 className='mb-0'>Settings</h2>
//           </div>
//           <div className='card-body'>
//             <div className='mb-4 text-center'>
//               <label className='form-label'>Profile Image</label>
//               <div className='mb-3'>
//                 <img
//                   src={image || "https://via.placeholder.com/150"}
//                   alt='Profile'
//                   className='img-thumbnail rounded-circle object-fit-cover'
//                   width='150'
//                   height='150'
//                   onError={handleImageError}
//                 />
//               </div>
//               <input
//                 type='file'
//                 accept='image/*'
//                 onChange={handleImageChange}
//                 className='form-control'
//                 style={{ display: "inline-block", width: "auto" }}
//               />
//             </div>
//             <div className='d-flex align-items-center mb-4'>
//               <label
//                 className='form-label me-3 mb-0'
//                 style={{ width: "150px" }}
//               >
//                 Profile Name
//               </label>
//               {isEditing ? (
//                 <input
//                   type='text'
//                   className='form-control'
//                   value={name}
//                   onChange={handleNameChange}
//                   onBlur={handleNameBlur}
//                   autoFocus
//                 />
//               ) : (
//                 <p
//                   className='form-control mb-0'
//                   onClick={handleNameClick}
//                   style={{ cursor: "pointer" }}
//                   title='Click to edit'
//                 >
//                   {name}
//                 </p>
//               )}
//             </div>
//             <div className='mb-4 d-flex justify-content-between'>
//               <label className='form-label'>Theme</label>
//               <ThemeChange />
//             </div>
//           </div>
//           <div className='card-footer text-end'>
//             <button className='btn btn-danger' onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import ThemeChange from "../../Utils/ThemeChange";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Component/Profile/Breadcrumbs";
import ProfileImage from "../../Component/Profile/ProfileImage";
import ProfileName from "../../Component/Profile/ProfileName";

const Settings = () => {
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/reactapphost/login");
  };

  const breadcrumbs = [
    <Link key='1' to='/reactapphost/'>
      Home
    </Link>,
    <span key='3' className='text-primary'>
      Settings
    </span>,
  ];

  return (
    <>
      <Breadcrumbs links={breadcrumbs} />
      <div className='container mt-1 px-0'>
        <div className='card shadow-sm'>
          <div className='card-header'>
            <h2 className='mb-0'>Settings</h2>
          </div>
          <div className='card-body'>
            <ProfileImage image={image} onImageChange={handleImageChange} />
            <ProfileName name={name} onNameChange={setName} />
            <div className='mb-4 d-flex justify-content-between'>
              <label className='form-label'>Theme</label>
              <ThemeChange />
            </div>
          </div>
          <div className='card-footer text-end'>
            <button className='btn btn-danger' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
