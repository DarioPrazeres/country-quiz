import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Footer from './component/Footer';
import './component/utils/i18n'; 
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <div className='body'>
    <App />
    <Footer/>
  </div>
)
