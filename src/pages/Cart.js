import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import swal from 'sweetalert';

const Cart = () => {
  let total = 0;
  const [products, setProducts] = useState([]);
  const [priceFetched, setPriceFetched] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    if(!cart.items) {
      return;
    }
    if(priceFetched) {
      return;
    }
    fetch("/api/products/cart-items", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ ids: Object.keys(cart.items) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setPriceFetched(true); 
      })
      .catch((err) => console.log(err.message));
  }, [cart, priceFetched]);

  const getQty = (productId) => {
    return cart.items[productId];
  };

  const incrementQty = (procuctId) => {
    const _cart = { ...cart };
    _cart.items[procuctId] += 1;
    _cart.totalItems += 1;
    setCart(_cart);
  };

  const decrementQty = (productId) => {
    const existingQty = cart.items[productId];
    if(existingQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] -= 1;
    _cart.totalItems -= 1;
    setCart(_cart);
  };

  const deleteItem = (productId) => {
    const _cart = { ...cart };
    const existingQty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItems -= existingQty;
    setCart(_cart);
    const updatedProducts = products.filter(product => product._id !== productId);
    setProducts(updatedProducts);
  };

  const getTotal = (productId, price) => {
    const sum = price * getQty(productId);
    total += sum;
    return sum;
  }

  const placeOrder = () => {
    swal("Order placed succesfully!", "", "success");
    setProducts([]);
    setCart({});
  }

  return (
    <div className="w-11/12 md:w-4/5 lg:w-3/5 mx-auto text-2xl my-10">
      {!products.length ? (
        <div className="my-20">
          <img src="/images/empty-cart.png" alt="empty cart" className="w-80 mx-auto" />
          <p className="text-center font-semibold text-xl mt-10">
            Your cart is empty!
          </p>
        </div>
      ) : (
        <>
          <h2 className="font-extrabold mb-10">Your Cart</h2>
          <div>
            {products.map((product) => (
              <div className="flex justify-between items-center my-12 sm:my-6 flex-wrap" key={product._id}>
                <div className="flex-row sm:flex items-center w-full sm:w-1/4">
                  <img src={product.image} alt={product.name} className="w-full sm:w-16 mr-3" />
                  <p className="font-semibold text-lg text-center sm:text-left">{product.name}</p>
                </div>
                <div className="flex items-center justify-center w-full sm:w-2/5 p-4 sm:p-0">
                  <button  onClick={() => decrementQty(product._id)} disabled={getQty(product._id)===1} className={`${getQty(product._id) === 1 ? "opacity-60 cursor-not-allowed" : null} bg-yellow-500 rounded-full text-xl font-semibold px-3 py-1 hover:bg-yellow-600`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </button>
                  <span className="text-lg font-semibold mx-3">
                    {getQty(product._id)}
                  </span>
                  <button  onClick={() => incrementQty(product._id)} className="bg-yellow-500 rounded-full text-xl font-semibold px-3 py-1 hover:bg-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </button>
                </div>
                <p className="font-semibold text-lg w-1/4">₹ {getTotal(product._id, product.price)}</p>
                <button onClick={() => deleteItem(product._id)} className="bg-red-500 hover:bg-red-600 font-semibold text-white text-lg leading-none rounded-full py-2 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <hr className="my-6" />
            <div className="text-right">
              <div className="font-normal text-lg">
                <span className="font-bold">Grand Total : </span> ₹ {total}
              </div>
              <button onClick={placeOrder} className="rounded-full py-2 px-4 mt-4 text-lg font-bold leading-none bg-yellow-500 hover:bg-yellow-600">
                Order now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
