import { useState } from "react";
import axios from "axios";
import { auth } from "../config/FirebaseConfiguration";
import AuthenticationRequiredModal from "./AuthenticationRequiredModal";

const PayButton = ({ cartItems }) => {
  const [openModal, setOpenModal] = useState(false);

  const url = "https://dragon-ecommerce-backend.onrender.com";
  const user = auth.currentUser;
  console.log(url);
  const handleCheckOut = () => {
    if (!user) {
      setOpenModal(true);
      return ;
    } else {
      console.log(user.uid);
      axios
        .post(`${url}/stripe/create-checkout-session`, {
          cartItems,
          user: user.uid,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
  
  return (
<div className="">
<button
      onClick={handleCheckOut}
      className={!openModal ?"mt-4 py-3 px-5 rounded-md text-primary-100 bg-primary-900 dark-bg-primary-100 hover:bg-secondary-900 hover:dark:bg-secondary-100 opacity-100 hover:text-black font-bold" : "h-min-screen w-screen "}
    >
      Check Out
    </button>
    {openModal && (<AuthenticationRequiredModal closeModal={setOpenModal}/>)}
</div>
  );
};

export default PayButton;
