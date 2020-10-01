import React from 'react';
import './App.css';
//import Navbar from './components/navbar/navbar'
import Mainpage from './components/mainpage/mainpage'
//import Footer from './components/footer/footer'

// class App extends React.Component{
//   constructor(props){
//     super(props);
//     this.state={
//     }
//   }
  
//   // <div>
//   //       <Navbar />
//   //       <div id="page-main">
//   //         <Mainpage />
//   //       </div>
//   //       <Footer />
//   //     </div>
  
//   render(){
//     return(
//       <div>
//       <Mainpage />
//         </div>
      
//     )
//   }
// }

const App = () => {
  
  return(
    <div>
      <Mainpage />
    </div>
  )
}

export default App;
