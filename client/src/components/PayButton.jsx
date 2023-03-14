import axios from "axios"
import {useSelector} from "react-redux";
import { saveUser } from "../features/authSlice"

import {auth} from "../config/FirebaseConfiguration";



const PayButton = ({ cartItems }) => {
  //const user = useSelector((state)=>state.auth.value);
  const url = "http://localhost:5000/api";
  const user = auth.currentUser;
  console.log(url)
  const handleCheckOut = () =>{
    console.log(user.uid)
    
    console.log(url)
     axios.post(`${url}/stripe/create-checkout-session`, {cartItems, user: user.uid})
   .then((res)=>{
    if(res.data.url){
      window.location.href= res.data.url
    }
   })
   .catch((err)=> console.log(err.message))
  }
  return (
    <button 
    onClick={handleCheckOut}
    className="mt-4 py-3 px-5 rounded-md text-primary-100 bg-primary-900 dark-bg-primary-100 hover:bg-secondary-900 hover:dark:bg-secondary-100 opacity-100 hover:text-black font-bold">
    Check Out
  </button>
  )
}

export default PayButton