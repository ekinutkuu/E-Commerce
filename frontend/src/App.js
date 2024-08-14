import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './pages/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateuserComponent from './pages/CreateUserComponent';
import UpdateuserComponent from './pages/UpdateUserComponent';
import ViewuserComponent from './pages/ViewUserComponent';
import CreateProductComponent from './pages/CreateProductComponent';
import LoginComponent from './pages/LoginComponent';
import RegisterComponent from './pages/RegisterComponent';
import ListProducts from './pages/ListProducts';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import ProductsAdmin from './pages/ProductsAdmin';
import ViewProductAdminComponent from './pages/ViewProductAdminComponent';
import CategoriesAdmin from './pages/CategoriesAdmin';
import CreateCategories from './pages/CreateCategories';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {LoginComponent}></Route>
                          <Route path = "/login" component = {LoginComponent}></Route>
                          <Route path = "/register" component = {RegisterComponent}></Route>
                          <Route path = "/admin" exact component = {AdminPage}></Route>
                          <Route path = "/users" component = {ListUserComponent}></Route>
                          <Route path = "/add-user/:id" component = {CreateuserComponent}></Route>
                          <Route path = "/view-user/:id" component = {ViewuserComponent}></Route>
                          {/* <Route path = "/update-user/:id" component = {UpdateuserComponent}></Route> */}
                          <Route path = "/admin/products" component = {ProductsAdmin}></Route>
                          <Route path = "/add-product/:id" component = {CreateProductComponent}></Route>
                          <Route path = "/view-product/:id" component = {ViewProductAdminComponent}></Route>
                          <Route path = "/admin/categories" component = {CategoriesAdmin}></Route>
                          <Route path = "/add-category/:id" component = {CreateCategories}></Route>
                          <Route path="/products" component = {ListProducts}></Route>
                          <Route path = "/cart" component={CartPage}></Route>
                          <Route path="/product/:productId" component={ProductPage}></Route>
                    </Switch>
                </div>
              {/* <FooterComponent /> */}
        </Router>
    </div>
    
  );
}

export default App;
