import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Link, Route, withRouter } from "react-router-dom";
//import AuthService from "./services/authService";
//import { PostContext } from "./context/postContext";
import "./App.css";
import Homepage from "./components/homepage/homepage";
import Mainpage from "./components/mainpage/mainpage";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Settings from "./components/user/settings";

const App = () => {
  //const { isLogged, setIsLogged, authorID, setAuthorID } = useContext(PostContext);

//render={() => <Mainpage />}

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/users/:user" exact  component={withRouter(Mainpage)}/>
      </Switch>
    </Router>
  );
};

export default App;
