import { BsFillTrashFill } from "react-icons/bs";

function CartItem({
  cartItem,
  handleDecreaseCart,
  handleIncreaseCart,
  handleRemoveFromCart,
}) {
  return (
    <div>
      <div className="flex ">
        <div className="w-1/2 flex px-2 py-3">
          <div className="bg-white rounded-md shadow-xl flex items-center justify-center 
          mr-3 sm:mr-2 lg:mr-4 px-4 py-4 sm:w-2/3 lg:w-1/6 
          ">
            <img
              src={cartItem.image}
              alt={cartItem.title}
              className="w-40 mx-auto lg:h-20 lg:w-16 r-4 rounded-md object-contain"
            />
          </div>
          <div>
            <p className="font-bold text-sm sm:text-xl  leading-snug">{cartItem.title}</p>
            <p className="my-2">${cartItem.price}</p>
          </div>
        </div>

        <div className="w-1/6 flex px-2 py-3 justify-center">
          <p className="font-bold lg:text-xl  flex items-center">
            ${cartItem.price}
          </p>
        </div>

        <div className="w-1/3 flex lg:px-3 py-3 my-auto justify-center mx-auto">
          <div className="w-4/5 flex h-2/5 ">
            <div className="w-full flex justify-between bg-secondary-100 dark:bg-secondary-900 ">
              <button
                onClick={() => handleDecreaseCart(cartItem)}
                className="rounded-md font-bold text-xl flex items-center px-1 lg:px-3 text-primary-100 dark:text-primary-900 bg-primary-900 dark:bg-primary-100 "
              >
                -
              </button>
              <div className="font-bold text-xl flex justify-center items-center  lg:w-1/3">
                {cartItem.amount}
              </div>
              <button
                onClick={() => handleIncreaseCart(cartItem)}
                className="rounded-md font-bold text-xl flex items-center px-1 lg:px-3 text-primary-100 dark:text-primary-900 bg-primary-900 dark:bg-primary-100 "
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleRemoveFromCart(cartItem)}
              className="w-1/5 flex justify-center items-center text-3xl ml-1 lg:ml-0"
            >
              <BsFillTrashFill />
            </button>
          </div>
        </div>

        <div className="w-1/6 flex  justify-center my-auto font-bold text-lg lg:text-2xl">${(cartItem.price * cartItem.amount).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CartItem;
