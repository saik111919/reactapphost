import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import FloatingLabelInput from "../../modules/FloatingLabelInput";
import { CgCloseO } from "react-icons/cg";
import { updateUserDetails } from "../../services/services";
import useLoader from "../../hooks/useLoader";
import useToast from "../../hooks/useToast";

const HoverableName = ({ name, onNameChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setLoader, LoaderComp] = useLoader(false);
  const addToast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: name },
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    setLoader(true);
    updateUserDetails(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        onNameChange(data.data.name);
        localStorage.setItem("name", data.data.name);
        setIsModalOpen(false);
      })
      .catch((err) => {
        addToast(
          "error",
          err.response?.data?.message || "Error occurred.",
          5000
        );
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div>
      <LoaderComp />
      <span
        className='text-2xl font-mono flex gap-1 align-middle lg:cursor-pointer'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {name || "Default Name"}
        {isHovered && (
          <span className='cursor-pointer' onClick={handleEditClick}>
            <BiEditAlt className='mt-1' />
          </span>
        )}
      </span>

      {isModalOpen && (
        <div className='modal fade show d-block' tabIndex='-1'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header flex justify-between'>
                <h5 className='modal-title'>Edit Name</h5>
                <button
                  type='button'
                  className=' transition-colors duration-200'
                  onClick={handleModalClose}
                  aria-label='Close'
                >
                  <CgCloseO className='w-6 h-6' />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='modal-body'>
                  <div className='mb-3'>
                    <FloatingLabelInput
                      type='text'
                      name='name'
                      label='Name'
                      register={register("name", {
                        required: {
                          value: true,
                          message: "Name is required.",
                        },
                      })}
                      error={errors["name"]}
                    />
                  </div>
                </div>
                <div className='modal-footer flex p-0'>
                  <button
                    type='submit'
                    className='flex-1 m-0 rounded-bl bg-blue-600 p-3'
                  >
                    Save
                  </button>
                  <button
                    type='button'
                    className='flex-1 bg-gray-500 p-3 m-0 rounded-br'
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className='modal-backdrop fade show'
          onClick={handleModalClose}
        ></div>
      )}
    </div>
  );
};

HoverableName.propTypes = {
  name: PropTypes.string,
  onNameChange: PropTypes.func.isRequired,
};

HoverableName.defaultProps = {
  name: "Default Name",
};

export default HoverableName;
