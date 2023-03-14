import Loader from "../components/Loader";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import ProductInStore from "../components/ProductInStore";

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    console.log(`succesfully added:${product}`);
  };

  return (
    <div className="w-screen flex justify-center">
      {isLoading ? (
        <div className="h-screen py-8 flex">
          <Loader />
        </div>
      ) : error ? (
        <p className="h-screen py-8 flex">An error ocurred :{error.data}</p>
      ) : (
        <div className="">
          <h2 className="text-3xl font-bold flex justify-center sm:my-6 mt-20 mb-6">
            New Arrivals
          </h2>
          <div className="flex flex-col pb-10
          
          lg:ml-6 lg:mr-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8 
          
          sm:ml-6 sm:mr-10 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6
          ">
            {data?.map((product) => (
              <div key={product.id} className="max-h-screen">
                <ProductInStore
                  product={product}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
