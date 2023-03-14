import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";

//redux importations
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,

} from "../features/cartSlice";
import PayButton from "../components/PayButton";

const Cart = () => {
  const { cartItems, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncreaseCart = (cartItem) => {
    dispatch(incrementQuantity(cartItem));
    console.log(`Incremented the quantity of ${cartItem}`);
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decrementQuantity(cartItem));
    console.log(`Decremented the quantity of ${cartItem}`);
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeItem(cartItem));
    console.log(`🗑 Removed from cart ${cartItem}`);
  };

  const handleClearCart = (cartItem) => {
    dispatch(clearCart(cartItem));
    console.log(`Cart cleared`);

  };

  return (
    <div className="min-h-screen">
      <h2 className="text-4xl flex justify-center pt-24 sm:pt-6 mb-3 pb-4">
        Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <div className="h-screen flex justify-center pt-14">
          <EmptyCart />
        </div>
      ) : (
        <div className="mx-5 sm:ml-8 sm:mr-10 lg:ml-5 lg:mr-10 ">
          <hr className="pt-4 border-primary-900 dark:border-primary-100" />
          <div className="flex justify-center mb-6">
            <h3 className="w-1/2 text-lg sm:text-2xl flex justify-center border-r-2 border-black  font-bold">
              Product Details
            </h3>
            <h3 className="w-1/6 flex justify-center border-r-2 border-black text-lg sm:text-2xl font-bold">
              Price
            </h3>
            <h3 className="w-1/3 text-lg flex justify-center sm:text-2xl font-bold border-r-2 border-black">
              Quantity
            </h3>
            <h3 className="w-1/6 text-lg flex justify-center sm:text-2xl font-bold">
              Total
            </h3>
          </div>
          <div className="">
            {cartItems?.map((cartItem) => (
              <div key={cartItem.id}>
                <CartItem
                  cartItem={cartItem}
                  handleDecreaseCart={handleDecreaseCart}
                  handleIncreaseCart={handleIncreaseCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                />
              </div>
            ))}
            <hr className="pt-4 border-primary-900 dark:border-primary-100" />
          </div>
          <div className="flex justify-between">
            
            <div>
              <button
                onClick={handleClearCart}
                className="ml-2 w-fit font-bold hover:text-xl px-2 py-1 rounded-md border-2 dark:border-primary-100 border-primary-900
                lg:text-3xl lg:px-4 lg:py-3
                "
              >
                Clear Cart
              </button>
            </div>
            <div className="border flex flex-col border-black py-4 px-10 rounded-xl lg:text-2xl lg:font-bold">
              <div className="flex justify-between ">
                <p className="lg:pr-10">Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <PayButton cartItems={cartItems} className="w-full"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
