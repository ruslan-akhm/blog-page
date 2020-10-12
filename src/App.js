import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/homepage/homepage";
import Mainpage from "./components/mainpage/mainpage";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Settings from "./components/user/settings";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const App = () => {
 
  
  
  //NEED TO MAKE 404 ROUTE FOR ALL OTHERS 

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/users/:user" exact  component={Mainpage}/>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
