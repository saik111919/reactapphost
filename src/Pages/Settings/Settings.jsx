// import { useEffect, useState } from "react";
// import ThemeChange from "../../Utils/ThemeChange";
// import { Link, useNavigate } from "react-router-dom";
// import Breadcrumbs from "../../Component/Profile/Breadcrumbs";
// import ProfileImage from "../../Component/Profile/ProfileImage";
// import ProfileName from "../../Component/Profile/ProfileName";
// import { getUserDetails, updateUserDetails } from "../../Api/Service";
// import { useToast } from "../../Plugins/Toast/ToastContext";
// import Loader from "../../Utils/Loader";

// const Settings = () => {
//   const [name, setName] = useState("John Doe");
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate();
//   const addToast = useToast();
//   const [loading, setLoading] = useState(false);

//   const handleImageChange = (event) => {
//     setImage(event);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/reactapphost/login");
//   };

//   function gettAllUserData() {
//     getUserDetails()
//       .then(({ data }) => {
//         console.log(data);
//         setName(data.name);
//       })
//       .catch((err) => {
//         addToast("error", err.data.message || "Error Occured.", 5000);
//       });
//   }

//   function handleUserDataChange(data) {
//     setLoading(true);
//     updateUserDetails(data)
//       .then(({ data }) => {
//         console.log(data);
//         addToast("success", data.message, 5000);
//         gettAllUserData();
//       })
//       .catch((err) => {
//         addToast("error", err.data.message || "Error Occured.", 5000);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }

//   useEffect(() => {
//     gettAllUserData();
//   }, []);

//   const breadcrumbs = [
//     <Link key='1' to='/reactapphost/'>
//       Home
//     </Link>,
//     <span key='3' className='text-primary'>
//       Settings
//     </span>,
//   ];

//   return (
//     <>
//       <Loader loader={loading} />
//       <Breadcrumbs links={breadcrumbs} />
//       <div className='container mt-1 px-0'>
//         <div className='card shadow-sm'>
//           <div className='card-header'>
//             <h2 className='mb-0'>Settings</h2>
//           </div>
//           <div className='card-body'>
//             <ProfileImage image={image} onImageChange={handleImageChange} />
//             <ProfileName
//               name={name}
//               onNameChange={setName}
//               onKeyEnter={handleUserDataChange}
//             />
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

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ThemeChange from "../../Utils/ThemeChange";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Component/Profile/Breadcrumbs";
import ProfileImage from "../../Component/Profile/ProfileImage";
import ProfileName from "../../Component/Profile/ProfileName";
import { getUserDetails, updateUserDetails } from "../../Api/Service";
import { useToast } from "../../Plugins/Toast/ToastContext";
import Loader from "../../Utils/Loader";

const Settings = () => {
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const addToast = useToast();

  const handleImageChange = (event) => {
    const file = event;
    setImage(file); // Assuming image will be handled separately, possibly uploaded to a server
    handleUserDataChange({ image: file });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/reactapphost/login");
  };

  const getAllUserData = () => {
    setLoading(true);
    getUserDetails()
      .then(({ data }) => {
        setName(data.name || "John Doe");
        setImage(data.image);
      })
      .catch((err) => {
        addToast(
          "error",
          err.response?.data?.message || "Error occurred.",
          5000
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUserDataChange = (data) => {
    setLoading(true);
    updateUserDetails(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        getAllUserData(); // Refresh user data
        setName(data.data.name);
        setImage(data.data.image);
      })
      .catch((err) => {
        addToast(
          "error",
          err.response?.data?.message || "Error occurred.",
          5000
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  const breadcrumbs = [
    <Link key='1' to='/reactapphost/'>
      Home
    </Link>,
    <span key='2' className='text-primary'>
      Settings
    </span>,
  ];

  return (
    <>
      <Loader loader={loading} />
      <Breadcrumbs links={breadcrumbs} />
      <div className='container mt-1 px-0'>
        <div className='card shadow-sm'>
          <div className='card-header'>
            <h2 className='mb-0'>Settings</h2>
          </div>
          <div className='card-body'>
            <ProfileImage image={image} onImageChange={handleImageChange} />
            <ProfileName
              name={name}
              onNameChange={setName}
              onSave={handleUserDataChange}
            />
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

Settings.propTypes = {
  // Define any props expected by the component, if needed
  // Example:
  name: PropTypes.string,
  // image: PropTypes.object,
  // onImageChange: PropTypes.func.isRequired,
  // handleUserDataChange: PropTypes.func.isRequired,
  // handleLogout: PropTypes.func.isRequired,
};

export default Settings;
