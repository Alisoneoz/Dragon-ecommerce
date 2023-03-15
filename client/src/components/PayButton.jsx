import { useState } from "react";
import axios from "axios";
import { auth } from "../config/FirebaseConfiguration";
import { useDispatch } from "react-redux";
import { clearCart } from  "../features/cartSlice"
import AuthenticationRequiredModal from "./AuthenticationRequiredModal";


const PayButton = ({ cartItems }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const url = "https://dragon-ecommerce-backend.onrender.com/api/stripe";
  const user = auth.currentUser;
  console.log(url);

  const handleCheckOut = (cartItem) => {
    if (!user) {
      setOpenModal(true);
      return ;
    } else {
      console.log(user.uid);
      axios
        .post(`${url}/create-checkout-session`, {
          cartItems,
          user: user.uid,
        })
        .then((res) => {
          dispatch(clearCart(cartItem));
          console.log(`Cart cleared`);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
  
  return (
<div className={openModal ? "h-min-screen w-screen " : ""}>

    {openModal ? (<AuthenticationRequiredModal closeModal={setOpenModal}/>)
    :(
      <button
      onClick={handleCheckOut}
      className="mt-4 py-3 px-5 rounded-md text-primary-100 bg-primary-900 dark:bg-primary-100 hover:bg-secondary-900 hover:dark:bg-secondary-100 opacity-100 hover:text-black font-bold dark:text-black"
    >
      Check Out
    </button>
    )}
</div>
  );
};

export default PayButton;
