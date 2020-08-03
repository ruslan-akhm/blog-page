import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import Mainpage from './components/mainpage'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  
  render(){
    return(
      <div>
        <Navbar />
        <div id="page-main">
          <Mainpage />
        </div>
      </div>
    )
  }
}

export default App;
