import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Footer from './component/Footer/Footer';
import LanguageSelector from './component/LanguageSelector/LanguageSelector';
import './assets/css/index.css';
import './utils/i18n'; 

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <div className='body'>
    <div className="language-controls-top">
      <LanguageSelector />
    </div>
    <App />
    <Footer/>
  </div>
)