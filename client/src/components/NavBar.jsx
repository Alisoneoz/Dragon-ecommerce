import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";
import { useSelector } from "react-redux";

//Logos
import logoDark from "../assets/logoDark.png";
import logoLight from "../assets/logoLight.png";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { BiCartAlt } from "react-icons/bi";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const user = useSelector((state) => state.auth.value);
  const { amount } = useSelector((state) => state.cart);

  const userTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState("light");

  const handleThemeSwitch = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    if (
      userTheme === "dark" ||
      window.matchMedia("(prefers-color-scheme:dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div>
      <div
        className=" items-center py-4 px-4 justify-between bg-secondary-100 dark:bg-primary-900 dark:border-b dark:shadow-xl
      hidden sm:flex lg:flex"
      >
        <div className="w-1/3 flex justify-start">
          <NavLink to="/" className="dark:shadow-xl font-bold pl-2 text-xl">
            Home
          </NavLink>
        </div>

        <div className="w-1/3 flex justify-center">
          <NavLink to="/">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              className="h-16"
            />
          </NavLink>
        </div>

        <div className="flex justify-end items-center w-1/3">
          {user ? (
            <div className="sm:mr-5 w-fit font-bold px-2 py-1 rounded-md border-2 border-primary-100 ">
              <LogOut />
            </div>
          ) : (
            <NavLink to="/login" className="px-4 flex items-center">
              <FaUser />
              <div className="pl-1 flex items-center">Access</div>
            </NavLink>
          )}

          <NavLink to="/cart" className=" flex relative sm:mr-5">
            <BiCartAlt className="text-4xl " />
            <span className="absolute bottom-6 left-6 rounded-full text-center w-6 bg-primary-900 dark:bg-primary-100 text-primary-100 dark:text-primary-900">
              {amount}
            </span>
          </NavLink>

          <button onClick={handleThemeSwitch} className="text-3xl sm:mr-12">
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </div>
      </div>


      
      <div
        className=" fixed w-full items-center
        bg-secondary-100 dark:bg-primary-900 dark:border-b dark:shadow-xl pb-3 pr-4 text-3xl pt-4
      flex justify-between sm:hidden lg:hidden
      "
      >
        <div className=" flex ml-4 ">
          <NavLink to="/">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              className="h-10"
            />
          </NavLink>
        </div>

        <div className="flex ">
        <NavLink to="/cart" className=" flex relative mr-5">
          <BiCartAlt className="text-4xl " />
          <span className="absolute bottom-6 left-6 rounded-full text-center text-sm font-bold w-6 bg-primary-900 dark:bg-primary-100 text-primary-100 dark:text-primary-900">
            {amount}
          </span>
        </NavLink>

        <button onClick={handleThemeSwitch} className="text-3xl mr-5">
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>

        <div onClick={handleNav}>
          {!nav ? <HiMenu className="" /> : <HiX />}
        </div>

        <div
          className={
            nav
              ? "fixed rigth-0 top-0 flex flex-col justify-start rounded-md bg-primary-900 ease-in-out duration-500 text-white border-b-2 border-gray-50 text-xl p-4 leading-loose shadow-5xl dark:bg-primary-100 dark:text-black"
              : "ease-out duration-100 fixed left-[-100%]"
          }
        >
          <NavLink to="/" className="">
            Home
          </NavLink>
          {user ? (
            <LogOut />
          ) : (
            <NavLink to="/login" className=" flex items-center pr-4">
              Login
            </NavLink>
          )}
          <NavLink to="/cart">Cart</NavLink>
        </div>
        </div>    

        
      </div>
    </div>
  );
};

export default NavBar;
