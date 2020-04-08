import React from 'react';
import './App.css';
import Navbar from './Navbar'
import Mainpage from './Mainpage'

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
        {/*<form id="header-img-form" action="/upload" method="GET"> enctype="multipart/form-data"
          {/*<input name="myImage" type="file" id="file"/>
          <input type="text" />
          <input type="submit" value="Submit" />
        </form> */}
        <div id="page-main">
          <Mainpage/>
        </div>
         
      </div>
    )
  }
}

export default App;
