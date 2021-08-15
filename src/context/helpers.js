export const getCart = () => {
  return new Promise((resolve, reject) => {
    const cart = localStorage.getItem("cart");
    resolve(JSON.parse(cart));
  });
};

export const storeCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

