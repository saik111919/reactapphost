import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginFun } from "../Api/Service";
import LoginSvg from "../assets/LoginSvg";
import Loader from "../Utils/Loader";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    loginFun(data)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/reactapphost/");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const mobileError = errors["mobile"];

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
                    <div className='d-flex justify-content-center login-btn'>
                      <button className='btn btn-primary'>Login</button>
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
