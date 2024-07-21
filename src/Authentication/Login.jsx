import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginFun } from "../Api/Service";
import LoginSvg from "../assets/LoginSvg";
import Loader from "../Utils/Loader";
import { useState } from "react";
import { useToast } from "../Plugins/Toast/ToastContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const onSubmit = (data) => {
    setLoading(true);
    loginFun(data)
      .then(({ data }) => {
        addToast("success", data.message, 5000);
        localStorage.setItem("token", data.token);
        navigate("/reactapphost/");
      })
      .catch((err) => {
        const errMsg = err?.data?.message || "Error occured.";
        addToast("error", errMsg, 5000);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const mobileError = errors["mobile"];
  const passwordError = errors["password"];

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
                    <LoginSvg />
                    Login
                  </h1>
                </div>
                <div className='login-form'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group mt-2'>
                      <input
                        type='text'
                        className={`form-control border border-2 ${
                          mobileError && "is-invalid"
                        }`}
                        placeholder='Enter Mobile number'
                        {...register("mobile", {
                          required: "Mobile Number is required",
                          pattern: /^[0-9]{10}$/,
                        })}
                      />
                      {mobileError && (
                        <div className='invalid-feedback'>
                          {mobileError.message}
                        </div>
                      )}
                    </div>
                    <div className='form-group mt-2'>
                      <input
                        type='password'
                        className={`form-control border border-2 ${
                          passwordError && "is-invalid"
                        }`}
                        placeholder='Enter password'
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message:
                              "Password must be at least 6 characters long",
                          },
                        })}
                      />
                      {passwordError && (
                        <div className='invalid-feedback'>
                          {passwordError.message}
                        </div>
                      )}
                    </div>
                    <div className='d-flex justify-content-center login-btn'>
                      <button className='btn btn-primary'>Login</button>
                    </div>
                    <div className='d-flex justify-content-center login-btn'>
                      <Link to='/reactapphost/signup'>New User? Register</Link>
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

export default Login;
