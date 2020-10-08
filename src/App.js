import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'
import './App.css';
import Mainpage from './components/mainpage/mainpage'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Settings from './components/user/settings'

const App = () => {
  
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={Mainpage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/settings" exact component={Settings} />
      </Switch>
    </Router>
    
  )
}

export default App;
