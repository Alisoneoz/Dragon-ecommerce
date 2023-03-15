import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import logoLight from "../assets/logoLight.png";
import { NavLink } from "react-router-dom";

const AuthenticationRequiredModal = ({ closeModal }) => {

  return (
    <div className="h-screen w-screen bg-black/90 fixed top-0 left-0 right-0 flex ease-in-out duration-500">
      <div
        className="ease-in-out duration-500 flex flex-col rounded-xl mx-auto my-auto shadow-2xl relative bg-primary-100 text-black
       w-4/6 
      sm:w-1/2 lg:h-4/6 py-4 sm:pb-0 px-5 "
      >
        <button onClick={()=>closeModal(false)} className="flex justify-end  text-4xl absolute right-5">
          <AiFillCloseCircle />
        </button>

        <div className="px-3 flex flex-col justify-center ">
          <img
            src={logoLight}
            className="w-40 flex justify-center mt-4 mx-auto mb-4 sm:mb-8 lg:mt-12"
          />
          <div className=" sm:px-0 flex flex-col items-center justify-center lg:px-16">
            <div className="font-bold text-base sm:text-xl lg:text-2xl text-center leading-1 lg:mt-10 lg:mb-3">
              Dear customer, to proceed with your checkout, please access to
              your account.
            </div>
            <button className="w-full mt-3 sm:mt-4 py-3 px-5 rounded-md text-primary-100 bg-primary-900  hover:bg-secondary-900 font-bold lg:mb-5">
              <NavLink to="/login">Log in</NavLink>
            </button>



            <div className="my-3  sm:mt-4 flex sm:justify-end items-center sm:pb-5">
            <div className="flex">Don't have an account?</div>
            <NavLink
              to="/register"
              className="ml-2 font-bold hover:text-xl min-w-fit sm:w-24 sm:hover:w-32 lg:hover:w-fit lg:w-fit  px-2 py-1 rounded-md border-2 border-primary-900"
            >
              Sign Up
            </NavLink>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationRequiredModal;
