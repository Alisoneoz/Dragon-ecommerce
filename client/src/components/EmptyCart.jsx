import { BsArrowLeftCircleFill } from "react-icons/bs";
import { NavLink } from "react-router-dom"

function EmptyCart() {
  return (
    <div className="flex flex-col items-center ">
      <h3 className="text-3xl font-semibold">Your Cart Is Empty...</h3>
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center  text-xl pt-5">
          <BsArrowLeftCircleFill className="animate-pulse mr-2" />
          <p>Start Shopping Now!</p>
        </NavLink>
      </div>
      
    </div>
  )
}

export default EmptyCart