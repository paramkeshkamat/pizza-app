import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={ProductsPage} />
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/cart" component={Cart} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </CartProvider>
  );
};

export default App;
