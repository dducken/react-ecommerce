import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { userInputs } from "./data";
import "./darkmode/dark.scss";
import {DarkModeContext} from "./context/darkModeContext"
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";
import Single from "./pages/single/Single";
import UpdateProduct from "./pages/single/UpdateProduct"
import ProductsList from "./pages/list/ProductsList";
import AddProduct from "./pages/new/AddProduct"
import Success from "./pages/success/Success";
import Profile from "./components/profile/Profile";
import Auth from "./pages/Auth";
import OrderList from "./pages/OrderList";
import RemitoList from "./pages/RemitoList";
import About from "./pages/About";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";





const App = () => {
  const loggedIn = useSelector((state) => state.user.currentUser);
  const isAdmin = useSelector((state) => state.user?.currentUser?.isAdmin);
  // const { darkMode } = useContext(DarkModeContext);
  
  return (
    // <div className={darkMode ? "app dark" : "app"}>
    <Router>
      <Routes>
        {/* Principal */}
       <Route path="/" element={<Home/>}/>
       <Route path="/register" element={loggedIn ? <Navigate replace to="/"/> : <Register/>}/>
       <Route path="/login" element={loggedIn ? <Navigate replace to="/"/> : <Login/>} />
       <Route path="/auth/login" element={loggedIn ? <Navigate replace to="/"/> : <Auth/>} />

       {/* Productos */}
       <Route path="/products/:category" element={<ProductList/>}/>
       <Route path="/products" element={<ProductList/>}/>
       <Route path="/product/:id" element={<Product/>}/>
       {/* <Route path="/admin/products/add" element={loggedIn && isAdmin ? <New inputs={productInputs} title="Agregar un nuevo producto"/> : <Navigate replace to="/"/> }></Route> */}
       <Route path="/admin/products/add" element={loggedIn && isAdmin ? <AddProduct/> : <Navigate replace to="/"/> }></Route>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/admin/products/:productId" element={loggedIn && isAdmin ? <UpdateProduct/> : <Navigate replace to="/"/> }></Route>

       {/* Admin */}
       {/* <Route path="/admin/panel" element={loggedIn && isAdmin ? <Admin/> : <Navigate replace to="/"/> } /> */}
       <Route path="/admin/panel" element={loggedIn && isAdmin && <Admin/> } />

       {/* <Route path="/admin/users" element={loggedIn && isAdmin ? <List/> : <Navigate replace to="/"/> } /> */}
       <Route path="/admin/users" element={loggedIn && isAdmin && <List/> } />
       <Route path="/admin/users/:userId" element={loggedIn && isAdmin ? <Single/> : <Navigate replace to="/"/> }></Route>
       <Route path="/admin/users/add" element={loggedIn && isAdmin ? <New inputs={userInputs} title="Agregar un nuevo usuario"/> : <Navigate replace to="/"/> }></Route>
       {/* <Route path="/admin/products" element={loggedIn && isAdmin ? <ProductsList/> : <Navigate replace to="/"/> } /> */}
       <Route path="/admin/products" element={loggedIn && <ProductsList/> } />

       <Route path="/success" element={loggedIn ? <Success/> : <Navigate replace to="/"/> } />

       {/* <Route path="/admin/orders" element={loggedIn && isAdmin ? <OrderList/> : <Navigate replace to="/"/> } /> */}
       <Route path="/admin/orders" element={loggedIn && isAdmin && <OrderList/> } />


       {/* <Route path="/admin/remitos" element={loggedIn && isAdmin ? <RemitoList/> : <Navigate replace to="/"/> } /> */}
       <Route path="/admin/remitos" element={loggedIn && isAdmin && <RemitoList/> } />




       {/* Not Found (Si en la url se escribe alguna ruta no valida, redirige al componente not found) */}
       <Route path="*" element={<NotFound/>}/>
       {/* <Route path="*" element={Home}/> */}

       {/* <Route path="/user/profile" element={loggedIn ? <Profile/> : <Navigate replace to="/"/> }></Route> */}
       <Route path="/user/profile" element={loggedIn && <Profile/> }></Route>
       <Route path="/about" element={<About/>}></Route>
       <Route path="/faq" element={<Help/>}></Route>




      </Routes>
    </Router>
    // </div>
  );
};

export default App;