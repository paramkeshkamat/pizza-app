import { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { id } = useParams();
  const history = useHistory();

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

  useEffect(() => {
    const fetchProduct = async () => {
      fetch(`/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data)
          setIsDataFetched(true);
        })
        .catch((err) => console.log(err.message));
    };
    fetchProduct();
  }, [id, history]);

  if(!product.name && isDataFetched) {
    return  <Redirect to="/page-not-found" />;
  }

  if (!product.name) {
    return (
      <div className="w-full mt-56 flex justify-center items-center">
        <Loader />
      </div>
    );
  }
 
  return (
    <div className="w-11/12 md:w-4/5 mx-auto my-12">
      <button className="font-bold mb-12 text-2xl flex items-center" onClick={() => history.goBack()}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <div className="flex-row sm:flex items-start">
        <img src={product.image} alt={product.name} className="w-full sm:w-auto"/>
        <div className="sm:ml-16 mt-4 sm:mt-0">
          <h2 className="font-extrabold text-3xl mb-2">{product.name}</h2>
          <p className="text-xl">{product.size}</p>
          <p className="font-bold text-xl mt-3 mb-4">₹ {product.price}</p>
          <button onClick={(e) => addToCart(e, product._id)} disabled={isAdding} className={`${isAdding ? "bg-green-500" : "bg-yellow-500 hover:bg-yellow-600"} py-2 w-40 font-bold rounded-full`}>
            {isAdding ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
