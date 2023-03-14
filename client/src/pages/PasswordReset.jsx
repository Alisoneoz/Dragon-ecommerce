import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { sendPasswordResetEmail} from "firebase/auth"
import { auth } from "../config/FirebaseConfiguration";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PasswordReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

//User's Password Reset with Firebase
  const onSubmit = (data) => {
    console.log(data);
    const {email } = data
    
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log("Email sent succesfully");
      toast.success('📩Reset Password link has been sent to your email', {
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
          <h2 className="text-3xl font-bold mb-3 sm:mb-1 lg:mb-4 flex justify-center">
            Reset your Password
          </h2>
          <p className="mb-4 font-bold">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
          <div className="">
            <label className="text-xl font-bold">Email</label>
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
            <button className="w-full  mt-4 py-3 px-5 rounded-md text-primary-100 bg-primary-900 dark-bg-primary-100 hover:bg-secondary-900 hover:dark:bg-secondary-100 hover:text-black font-bold">
              Continue
            </button>
          </div>
          <div className="mt-5 flex sm:justify-end items-center">
            <div className="flex">Don't have an account? </div>
            <NavLink
              to="/register"
              className="ml-2 font-bold hover:text-xl px-2 py-1 border rounded-md border-2 border-primary-100"
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


export default PasswordReset