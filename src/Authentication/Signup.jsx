import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Api/Service"; // Adjust the path as necessary
import Loader from "../Utils/Loader";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    registerUser(data)
      .then(({ data }) => {
        console.log(data.message);
        navigate("/reactapphost/login");
      })
      .catch(() => {
        console.error("Failed to register user");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const password = watch("password", "");

  return (
    <>
      <Loader loader={loading} />
      <div className='login-page p-0 m-0'>
        <div className='row p-0'>
          <div className='col-md-12'>
            <div className='d-flex justify-content-center align-items-center login-form-body'>
              <div className='login-body'>
                <div className='mb-3 login-title'>
                  <h1 className='d-flex flex-wrap justify-content-center align-items-baseline'>
                    Signup
                  </h1>
                </div>
                <div className='login-form'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group mt-2'>
                      <input
                        type='text'
                        className={`form-control border border-2 ${
                          errors.mobile && "is-invalid"
                        }`}
                        placeholder='Enter Mobile number'
                        {...register("mobile", {
                          required: "Mobile Number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit mobile number",
                          },
                        })}
                      />
                      {errors.mobile && (
                        <div className='invalid-feedback'>
                          {errors.mobile.message}
                        </div>
                      )}
                    </div>
                    <div className='form-group mt-2'>
                      <input
                        type='password'
                        className={`form-control border border-2 ${
                          errors.password && "is-invalid"
                        }`}
                        placeholder='Enter Password'
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                      />
                      {errors.password && (
                        <div className='invalid-feedback'>
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div className='form-group mt-2'>
                      <input
                        type='password'
                        className={`form-control border border-2 ${
                          errors.confirmPassword && "is-invalid"
                        }`}
                        placeholder='Confirm Password'
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      {errors.confirmPassword && (
                        <div className='invalid-feedback'>
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </div>
                    <div className='d-flex justify-content-center login-btn mt-3'>
                      <button className='btn btn-primary'>Signup</button>
                    </div>
                    <div className='d-flex justify-content-center login-btn mt-3'>
                      <Link to='/reactapphost/login'>Back to Login</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
