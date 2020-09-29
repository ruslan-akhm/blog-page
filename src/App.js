import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar'
import Mainpage from './components/mainpage'
import Footer from './components/footer/footer'

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
        <Footer />
      </div>
    )
  }
}

export default App;
