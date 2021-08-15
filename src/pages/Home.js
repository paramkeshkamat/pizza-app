import { useHistory } from "react-router-dom";
import Products from "../components/Products";

const Home = () => {
  const history = useHistory();
  return (
    <div className="w-11/12 md:w-4/5 mx-auto py-16">
      <div className="flex-row sm:flex justify-between items-center">
        <div className="w-full md:w-1/2 text-center sm:text-left">
          <h3 className="text-lg italic">Are you hungry?</h3>
          <h1 className="text-3xl md:text-6xl font-bold">Don't wait!</h1>
          <button onClick={() => history.push("/products")} className="px-6 py-2 rounded-full text-white font-bold mt-3 bg-yellow-500 hover:bg-yellow-600 shadow">
            Order now
          </button>
        </div>
        <div className="pt-10 md:pt-0 w-full md:w-1/2">
          <img className="w-4/5 mx-auto drop-shadow-2xl" src="/images/pizza.png" alt="pizza" />
        </div>
      </div>
      <div className="mt-24">
        <Products />
      </div>
    </div>
  );
};

export default Home;
