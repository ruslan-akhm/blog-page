import React from 'react';
import './App.css';
import Navbar from './Navbar'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  
  render(){
    return(
      <div>
        <Navbar/>
        <div id="page-main">
        </div>
      </div>
    )
  }
}

export default App;
