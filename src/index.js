import React from 'react';
import ReactDOM from 'react-dom';
import {PostProvider} from './context/postContext'
import App from './App';

ReactDOM.render(
  <PostProvider>
    <App />
  </PostProvider>, 
  document.getElementById('root')
);

