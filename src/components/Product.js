import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Product = ({ _id, image, name, size, price }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const addToCart = (e, id) => {
    e.preventDefault();
    let _cart = { ...cart };

    if (!_cart.items) {
      _cart.items = {};
    }

    if (_cart.items[id]) {
      _cart.items[id] += 1;
    } else {
      _cart.items[id] = 1;
    }

    if (!_cart.totalItems) {
      _cart.totalItems = 1;
    } else {
      _cart.totalItems += 1;
    }

    setCart(_cart);
    setIsAdding(true);
  };

  useEffect(() => {
    const addingTimeOut = setTimeout(() => {
      setIsAdding(false);
    }, 1000);
    return () => clearTimeout(addingTimeOut, 1000);
  }, [cart]);

  return (
    <Link to={`/products/${_id}`}>
      <div>
        <img src={image} alt={name} className="w-full" />
        <div>
          <div className="text-center">
            <h3 className="text-lg font-bold py-2">{name}</h3>
            <span className="rounded-full bg-gray-200 px-3 py-1 leading-none text-sm font-medium">
              {size}
            </span>
          </div>
          <div className="flex justify-between items-center mt-3 p-3">
            <p className="font-semibold">₹ {price}</p>
            <button
              disabled={isAdding}
              className={`${isAdding ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600"} rounded-full py-1 px-4 font-bold`}
              onClick={(e) => addToCart(e, _id)}
            >
              {isAdding ? "Added" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
