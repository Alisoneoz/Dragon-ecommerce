export default function ProductInStore({ product, handleAddToCart }) {
  return (
    
      <div className="rounded-lg shadow-lg bg-secondary-100 dark:bg-secondary-900  
      mb-7 mx-5 pt-2 pb-8 px-4 
      lg:py-5 lg:px-7 lg:h-full lg:mx-0
      sm:py-5 sm:px-7 sm:h-full sm:mx-0
      ">
        <h3 className="font-bold text-center leading-tight my-4
        lg:text-xl sm:text-lg text-xl
        ">
          {product.title}
        </h3>
        <div className="bg-white py-4 w-11/12 rounded-md shadow-xl mx-auto">
          <img src={product.image} className="object-contain mx-auto h-40" alt={product.title} />
        </div>
        <p className="mt-5 leading-tight h-20 overflow-hidden">{product.description}</p>
        <p className="font-bold text-2xl mt-3">${product.price}</p>
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-3 py-3 px-5 w-full rounded-md text-primary-100 bg-primary-900 dark-bg-primary-100 hover:bg-secondary-900 hover:dark:bg-secondary-100"
        >
          Add to Cart
        </button>
      </div>
    
  );
}
