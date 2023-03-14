import { signOut } from "firebase/auth";
import { auth } from "../config/FirebaseConfiguration";

export const LogOut = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <button onClick={handleLogout} className="">
      Log Out
    </button>
  );
};

export default LogOut;
