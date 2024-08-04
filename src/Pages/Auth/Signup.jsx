import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { registerUser } from "../../services/services"; // Assuming you have a signup function similar to loginFun
import useToast from "../../hooks/useToast";
import { BiLogInCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FloatingLabelInput from "../../modules/FloatingLabelInput";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const addToast = useToast();
  const [setLoader, LoaderComp] = useLoader();

  const onSubmit = (data) => {
    setLoader(true);
    registerUser(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        navigate("/reactapphost/login");
      })
      .catch((err) => {
        const errMsg = err?.data?.message || "Error occurred.";
        addToast("error", errMsg, 5000);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const mobileError = errors["mobile"];
  const passwordError = errors["password"];
  const confirmPasswordError = errors["confirmPassword"];

  const password = watch("password");

  return (
    <>
      <LoaderComp />
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='card w-96 p-4 rounded-lg shadow-lg'>
          <div className='card-title p-2 py-3 mb-4 text-center text-3xl flex items-center justify-center'>
            <BiLogInCircle className='text-4xl mr-2' />
            Signup
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <FloatingLabelInput
                  type='tel'
                  name='mobile'
                  label='Mobile'
                  register={register("mobile", {
                    required: "Mobile number is required.",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit mobile number.",
                    },
                  })}
                  error={mobileError}
                />
              </div>
              <div className='relative'>
                <FloatingLabelInput
                  type={passwordVisible ? "text" : "password"}
                  name='password'
                  label='Password'
                  register={register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  error={passwordError}
                />
                <button
                  type='button'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className='absolute inset-y-0 top-8 right-0 px-2 rounded-r-md bg-light text-dark border-2 flex items-center cursor-pointer'
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <p className='text-danger text-sm mt-1'>
                  {passwordError?.message}
                </p>
              )}
              <div className='relative'>
                <FloatingLabelInput
                  type={confirmPasswordVisible ? "text" : "password"}
                  name='confirmPassword'
                  label='Confirm Password'
                  register={register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={confirmPasswordError}
                />
                <button
                  type='button'
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className='absolute inset-y-0 top-8 right-0 px-2 rounded-r-md bg-light text-dark border-2 flex items-center cursor-pointer'
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className='text-danger text-sm mt-1'>
                  {confirmPasswordError?.message}
                </p>
              )}
              <div className='flex flex-col gap-2'>
                <button
                  type='submit'
                  className='btn btn-primary w-full rounded-md p-3 hover:bg-blue-700 transition duration-200'
                >
                  Signup
                </button>
                <div className='relative flex items-center my-2'>
                  <div className='flex-grow border-t border-gray-300'></div>
                  <span className='flex-shrink mx-4 text-gray-500'>or</span>
                  <div className='flex-grow border-t border-gray-300'></div>
                </div>
                <Link
                  to={"/reactapphost/login"}
                  className='link-arrow text-center w-full text-blue-500 hover:text-blue-700 underline transition duration-200'
                >
                  Back to Login.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
