import PropTypes from "prop-types";

const FloatingLabelInput = ({
  type = "text",
  name,
  placeholder = "",
  label = "Float",
  register,
  error,
}) => {
  return (
    <>
      <label htmlFor={name} className='text-lg mb-1'>
        {label}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        {...register}
        className='form-control peer w-full py-3 px-2 border rounded-md shadow-none'
      />

      {error && type !== "password" && (
        <p className='text-danger text-sm mt-1'>{error?.message}</p>
      )}
    </>
  );
};

FloatingLabelInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  register: PropTypes.object,
  required: PropTypes.bool,
  error: PropTypes.object,
};

export default FloatingLabelInput;
