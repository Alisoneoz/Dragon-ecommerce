import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../config/FirebaseConfiguration";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

//User Login with Firebase
  const onSubmit = (data) => {
    console.log(data);
    
    const {email, password }= data;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log("Signed in user", user);
      toast.success('🐲Welcome back to Dragon Store!🐲', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      reset();
    })
    .catch((error)=>{
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`an error ocurred: ${errorCode}, ${errorMessage}`)
      toast.error(`There was an error: ${errorCode}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    })


  };

  return (
    <div className="min-h-screen flex justify-center  bg-storeImage bg-cover bg-center opacity-85">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-9 rounded-lg shadow-xl ml-7 mr-9 w-full sm:w-4/6 lg:w-1/3 h-fit  bg-secondary-100/80 dark:bg-secondary-900/80 
        mt-20 sm:mt-28 lg:mt-28
        "
      >
        <div className="">
          <h2 className="text-3xl font-bold pb-2 flex justify-center">
            Sign In
          </h2>
          <div className="pb-3">
            <label className="text-xl">Email</label>
            <input
              type="text"
              name="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                  message:
                    "Email is not valid, please check the email you entered, and try it again.",
                },
              })}
              className={`w-full rounded-md shadow-xl px-2 py-1 mt-1 mb-2 bg-primary-100/80 dark:bg-primary-900/80 ${
                errors.email
                  ? "border border-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 "
                  : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-900 font-bold">{errors.email.message}</p>
            )}
          </div>
          <div className="">
            <label className="text-xl">Password</label>
            <div className="flex">
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                {...register("password", {
                  requiered: true,
                  validate: {
                    checkLength: (value) => value.length >= 6,
                    matchPattern: (value) =>
                      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#.$*])/.test(
                        value
                      ),
                  },
                })}
                className={`w-full rounded-md shadow-xl px-2 py-1 mt-1 mb-2 bg-primary-100/80 dark:bg-primary-900/80 ${
                  errors.email
                    ? "border border-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-00 "
                    : ""
                }`}
              />
              <div
                onClick={togglePassword}
                className="text-3xl flex items-center ml-1"
              >
                {passwordShown ? <MdVisibilityOff /> : <MdVisibility />}
              </div>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-900 font-bold">Password is required</p>
            )}

            {errors.password?.type === "checkLength" && (
              <p className="text-red-900 font-bold">
                Password should be at least 6 characters long
              </p>
            )}

            {errors.password?.type === "matchPattern" && (
              <div className="text-red-900 font-bold ml-2">
                <p>Password shold contain at least:</p>
                <div className="ml-2">
                  <li>An uppercase letter.</li>
                  <li>A lowercase letter.</li>
                  <li>A digit.</li>
                  <li>A special symbol.</li>
                </div>
              </div>
            )}
            <NavLink to="/password-reset" className="font-bold text-lg hover:text-xl">Forgot your password?</NavLink>
          </div>
          <div className="">
            <button className="w-full mt-4 py-3 px-5 rounded-md text-primary-100 bg-primary-900 dark-bg-primary-100 hover:bg-secondary-900 hover:dark:bg-secondary-100 hover:text-black font-bold">
              Sign In
            </button>
          </div>
          <div className="mt-5 flex sm:justify-end items-center">
            <div className="flex">Don't have an account?</div>
            <NavLink
              to="/register"
              className="ml-2 font-bold hover:text-xl  px-2 py-1 rounded-md border-2 border-primary-100"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
