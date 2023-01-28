import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Footer from './component/Footer';
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <div className='body'>
    <App />
    <Footer/>
  </div>
)
