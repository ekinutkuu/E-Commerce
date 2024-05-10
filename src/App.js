import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateuserComponent from './components/CreateUserComponent';
import UpdateuserComponent from './components/UpdateUserComponent';
import ViewuserComponent from './components/ViewUserComponent';
import CreateProductComponent from './components/CreateProductComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';


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
                          <Route path = "/users" component = {ListUserComponent}></Route>
                          <Route path = "/add-user/:id" component = {CreateuserComponent}></Route>
                          <Route path = "/view-user/:id" component = {ViewuserComponent}></Route>
                          {/* <Route path = "/update-user/:id" component = {UpdateuserComponent}></Route> */}
                          <Route path = "/add-product/:id" component = {CreateProductComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
