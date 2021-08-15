import { useState, useEffect } from "react";
import Loader from "./Loader";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      fetch("/api/products")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((err) => console.log(err.message));
    };
    fetchProducts();
  }, []);

  if (!products.length) {
    return (
      <div className="w-full mt-56 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-extrabold mt-8 mb-12">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20 my-8">
        {products.map((product) => (
          <Product key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
