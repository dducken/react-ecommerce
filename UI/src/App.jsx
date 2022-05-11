import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";




const App = () => {
  const loggedIn = useSelector((state) => state.user.currentUser) 
  return (
    <Router>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/register" element={loggedIn ? <Navigate replace to="/"/> : <Register/>}/>
       <Route path="/login" element={loggedIn ? <Navigate replace to="/"/> : <Login/>} />
       <Route path="/products/:category" element={<ProductList/>}/>
       <Route path="/products" element={<ProductList/>}/>
       <Route path="/product/:id" element={<Product/>}/>
       <Route path="/cart" element={<Cart/>}/>

      </Routes>
    </Router>
  );
};

export default App;