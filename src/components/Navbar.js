import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { cart } = useContext(CartContext);
  const navbarRef = useRef();

  useEffect(() => {
    if(showNavbar) {
      navbarRef.current.classList.remove("h-0");
      navbarRef.current.classList.add("h-36");
    } else {
      navbarRef.current.classList.remove("h-36");
      navbarRef.current.classList.add("h-0");
    }
  }, [showNavbar])


  return (
    <nav className="w-11/12 md:w-4/5 mx-auto flex-column md:flex items-center justify-between py-4">
      <div className="w-full md:w-auto flex justify-between items-center">
        <Link to="/" className="w-full md:w-4/5">
          <img className="h-12 w-28 md:w-32" src="/images/logo.png" alt="logo" />
        </Link>
        <button onClick={() => setShowNavbar(!showNavbar)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <ul className="flex-column md:flex items-center h-0 md:h-auto overflow-hidden p-2 md:p-0 transition ease duration-300" ref={navbarRef}>
        <li className="my-3 md:my-0">
          <Link to="/">Home</Link>
        </li>
        <li className="md:ml-6 my-3 md:my-0">
          <Link to="/products">Products</Link>
        </li>
        <li className="md:ml-6 my-3 md:my-0">
          <Link to="/cart">
            <div className="rounded-full py-2 px-4 flex items-center justify-center w-20 bg-yellow-500 hover:bg-yellow-600">
              <span className="text-white font-bold">
                {cart.totalItems ? cart.totalItems : 0}
              </span>
              <img className="ml-3 w-auto h-5" src="/images/cart.png" alt="cart" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
