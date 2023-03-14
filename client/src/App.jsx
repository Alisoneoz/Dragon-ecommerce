import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar"
// Auth
import { auth } from "./config/FirebaseConfiguration";
import { onAuthStateChanged } from "firebase/auth";
import { saveUser } from "./features/authSlice";
//pages
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import Register from "./pages/Register";

// Cart
import { calculateTotals } from "./features/cartSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.value)
  console.log("user from state", user);
  console.log({user})

  const { cartItems, amount } = useSelector((state) => state.cart);

  useEffect(()=>{
    dispatch(calculateTotals());
    
  }, [cartItems])


//Saving user token from Firebase
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if (user){
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch( saveUser(undefined))
      }
    })
  }, [auth, dispatch]);
  
  return (
    <div className="App min-h-screen m-0 p-0 box-border font-josefin bg-primary-100 dark:bg-primary-900 dark:text-primary-100 ">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/password-reset" element={<PasswordReset/>} />
          <Route path="/register" element={<Register/>} />
         
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
