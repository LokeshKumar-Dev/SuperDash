import React, { useEffect } from "react";
import "./App.css";
import "./my.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/productScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import AddProduct from "./screens/AddProduct";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import UsersScreen from "./screens/UsersScreen";
import SellersScreen from "./screens/SellersScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { listCategories } from "./Redux/Actions/ProductActions";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, listProductsById } from "./Redux/Actions/ProductActions";
import { listOrders, listOrdersById } from "./Redux/Actions/OrderActions";

function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.isVendor) {
      dispatch(listProductsById());
      dispatch(listOrdersById()); return
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter path="/category" component={!userInfo?.isVendor ? CategoriesScreen : NotFound} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/users" component={!userInfo?.isVendor ? UsersScreen : NotFound} />
          <PrivateRouter path="/sellers" component={!userInfo?.isVendor ? SellersScreen : NotFound} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route path="/login" component={Login} /> 
          <Route path="/register" component={Register} /> 
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
      {/* <h1>Datae</h1> */}
    </>
  );
}

export default App;
