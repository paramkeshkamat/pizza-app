import { useState, useEffect, createContext } from "react";
import { getCart, storeCart } from "./helpers";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    getCart().then((cart) => setCart(cart));
  }, []);

  useEffect(() => {
    storeCart(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// cart structure
// {
//     items: {
//         "60c67bc0f5ee510015f3dda7": 1,
//         "60c67bc0f5ee510015f3dda7": 2
//     },
//     totalItems: 3
// }
