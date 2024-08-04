import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoader from "../../hooks/useLoader";
import { loginFun } from "../../services/services";
import useToast from "../../hooks/useToast";
import { BiLogInCircle } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FloatingLabelInput from "../../modules/FloatingLabelInput";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const addToast = useToast();
  const [setLoader, LoaderComp] = useLoader();

  const onSubmit = (data) => {
    setLoader(true);
    loginFun(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        navigate("/reactapphost/");
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

  return (
    <>
      <LoaderComp />
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='card w-96 p-4 rounded-lg shadow-lg'>
          <div className='card-title p-2 py-3 mb-4 text-center text-3xl flex items-center justify-center'>
            <BiLogInCircle className='text-4xl mr-2' />
            Login
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
                    required: "Password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long.",
                    },
                  })}
                />
                <button
                  type='button'
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className='absolute inset-y-0 top-8 right-0 border-2 rounded-r-md bg-light text-dark px-2 flex items-center cursor-pointer'
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <p className='text-danger text-sm mt-1'>
                  {passwordError?.message}
                </p>
              )}

              <div className='flex flex-col gap-4 p-4 rounded-lg shadow-md'>
                <button
                  type='submit'
                  className='btn btn-primary w-full rounded-md p-3 hover:bg-blue-700 transition duration-200'
                >
                  Login
                </button>
                <div className='relative flex items-center my-2'>
                  <div className='flex-grow border-t border-gray-300'></div>
                  <span className='flex-shrink mx-4 text-gray-500'>or</span>
                  <div className='flex-grow border-t border-gray-300'></div>
                </div>
                <Link
                  to='/reactapphost/signup'
                  className='link-arrow text-center w-full text-blue-500 hover:text-blue-700 underline transition duration-200'
                >
                  New user? Signup.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
