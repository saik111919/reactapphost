import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginFun } from "../Api/Service";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    loginFun(data)
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h3>Login</h3>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group mb-3'>
                  <label htmlFor='mobileNumber'>Mobile Number</label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.mobile ? "is-invalid" : ""
                    }`}
                    id='mobileNumber'
                    {...register("mobile", {
                      required: {
                        value: true,
                        message: "Mobile number is required",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Invalid mobile number format",
                      },
                    })}
                  />
                  {errors.mobile && (
                    <div className='invalid-feedback'>
                      {errors.mobile.message}
                    </div>
                  )}
                </div>
                <button type='submit' className='btn btn-primary'>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
